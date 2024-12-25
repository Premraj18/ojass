import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req) {
  try {
    console.log('Starting payment creation...'); // Debug log
    await connectDB();
    
    const { userId, amount } = await req.json();
    console.log('Received payment request:', { userId, amount });

    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await User.findById(userId);
    console.log('Found user:', { 
      id: user?._id, 
      name: user?.name, 
      ojassId: user?.ojassId 
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate a shorter receipt ID
    const shortId = Date.now().toString().slice(-6);
    const receiptId = `rcpt_${shortId}`;

    const options = {
      amount: Math.round(amount * 100), // Ensure amount is an integer
      currency: 'INR',
      receipt: receiptId,
      notes: {
        userId: userId,
        ojassId: user.ojassId
      }
    };

    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment initialization failed' },
      { status: 500 }
    );
  }
} 