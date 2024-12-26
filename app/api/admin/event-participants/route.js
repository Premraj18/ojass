import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const participants = await User.find({
      events: eventId
    }).select('name ojassId college registrationDate');

    return NextResponse.json({ participants });
  } catch (error) {
    console.error('Event participants fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event participants' },
      { status: 500 }
    );
  }
} 