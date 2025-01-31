import { NextResponse } from 'next/server';
import webpush from 'web-push';
import connectDB from '@/lib/db';
import Notification from '@/models/Notification';
import Subscription from '@/models/Subscription';
import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure web-push with your VAPID keys
webpush.setVapidDetails(
  'mailto:digicraft.one@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

async function uploadToCloudinary(base64Data) {
  try {
    // Remove data URL prefix if present
    const base64String = base64Data.replace(/^data:image\/\w+;base64,/, '');
    
    // Upload with transformation to optimize size
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64String}`, {
      folder: 'ojass-notifications',
      resource_type: 'image',
      transformation: [
        { width: 500, height: 300, crop: 'fit' },
        { quality: 'auto:low' }
      ]
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { title, body, image } = await req.json();

    // Upload and optimize image if provided
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadToCloudinary(image);
    }

    // Create notification in database
    const notification = await Notification.create({
      title,
      content: body,
      imageUrl,
    });

    // Prepare notification payload
    const payload = {
      title,
      body: stripHtml(body),
      icon: '/logo.webp',
      badge: '/logo.webp',
      data: {
        url: 'https://ojass.org/dashboard/notifications',
        timestamp: Date.now()
      }
    };

    if (imageUrl) {
      payload.image = imageUrl;
    }

    // Get all active subscriptions from database
    const subscriptions = await Subscription.find({});
    console.log(`Found ${subscriptions.length} subscriptions to notify`);

    // Send to all subscribed clients
    if (subscriptions.length > 0) {
      const sendPromises = subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(sub.subscription, JSON.stringify(payload));
          console.log('Successfully sent notification to a subscriber');
        } catch (error) {
          console.error('Error sending to subscription:', error);
          if (error.statusCode === 410 || error.statusCode === 404) {
            // Remove expired or invalid subscription
            await Subscription.findByIdAndDelete(sub._id);
            console.log('Removed invalid subscription');
          }
        }
      });

      await Promise.all(sendPromises);
    }

    return NextResponse.json({ 
      success: true,
      notification: {
        id: notification._id,
        title,
        content: body,
        imageUrl,
        createdAt: notification.createdAt
      }
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}

// Endpoint to save subscription
export async function PUT(req) {
  try {
    await connectDB();
    const subscription = await req.json();

    // Save or update subscription in database
    await Subscription.findOneAndUpdate(
      { 'subscription.endpoint': subscription.endpoint },
      { subscription },
      { upsert: true, new: true }
    );

    console.log('Successfully saved/updated subscription');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return NextResponse.json(
      { error: 'Failed to save subscription' },
      { status: 500 }
    );
  }
} 