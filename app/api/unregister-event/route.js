import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDB();
    
    const { userId, eventId } = await req.json();

    if (!userId || !eventId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user and remove event
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          events: eventId,
          eventDetails: { eventId: eventId }
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      events: updatedUser.events,
      message: 'Successfully unregistered from event'
    });
  } catch (error) {
    console.error('Event unregistration error:', error);
    return NextResponse.json(
      { error: 'Failed to unregister from event' },
      { status: 500 }
    );
  }
} 