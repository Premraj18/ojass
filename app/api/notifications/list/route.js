import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Notification from '@/models/Notification';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch notifications sorted by creation date (newest first)
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .select('title content imageUrl createdAt')
      .lean();

    return NextResponse.json({ 
      success: true, 
      notifications 
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
} 