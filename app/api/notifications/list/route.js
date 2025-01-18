import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Notification from '@/models/Notification';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req) {
  try {
    await connectDB();
    
    // Force a new database query each time
    await Notification.syncIndexes();
    
    const notifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    // Add cache prevention headers
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '-1',
      'Surrogate-Control': 'no-store'
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