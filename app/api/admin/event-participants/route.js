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
    }).select({
      name: 1,
      email: 1,
      phone: 1,
      ojassId: 1,
      college: 1,
      paid: 1,
      events: 1,
      eventDetails: 1,
      registrationDate: 1,
      payment: 1
    }).sort({ registrationDate: -1 });

    return NextResponse.json({ participants });
  } catch (error) {
    console.error('Event participants fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event participants' },
      { status: 500 }
    );
  }
} 