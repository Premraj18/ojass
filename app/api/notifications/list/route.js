import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Notification from '@/models/Notification';

export async function GET(request) {
  try {
    await connectDB();
    
    const notifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Add cache prevention headers
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    return NextResponse.json(
      { notifications }, 
      { 
        status: 200,
        headers: headers
      }
    );
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
} 