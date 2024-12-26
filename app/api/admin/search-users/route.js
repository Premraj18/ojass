import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { ojassId: { $regex: query, $options: 'i' } }
      ]
    }).select('-password');

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Admin search error:', error);
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 }
    );
  }
} 