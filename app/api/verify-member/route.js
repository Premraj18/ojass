import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const ojassId = searchParams.get('ojassId');

    if (!ojassId || !ojassId.match(/^OJASS-[0-9A-Z]{6}$/)) {
      return NextResponse.json(
        { error: 'Invalid OJASS ID format' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ ojassId }).select('name paid events');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found', status: 'not_found', message: `User with ID ${ojassId} does not exist` },
        { status: 200 }
      );
    }

    return NextResponse.json({
      name: user.name,
      paid: user.paid,
      events: user.events || [],
      status: user.paid ? 'verified' : 'not_paid'
    });
  } catch (error) {
    console.error('Member verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify member' },
      { status: 500 }
    );
  }
} 