import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDB();
    
    const { userId, eventId, eventName } = await req.json();

    if (!userId || !eventId || !eventName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user and check payment status
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.paid) {
      return NextResponse.json(
        { error: 'Please complete registration payment first' },
        { status: 403 }
      );
    }

    // Check if already registered
    if (user.events?.includes(eventId)) {
      return NextResponse.json(
        { error: 'Already registered for this event' },
        { status: 400 }
      );
    }

    // Add event to user's events
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          events: eventId,
          eventDetails: { eventId, eventName, registrationDate: new Date() }
        }
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      events: updatedUser.events,
      message: 'Successfully registered for event'
    });
  } catch (error) {
    console.error('Event registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register for event' },
      { status: 500 }
    );
  }
} 