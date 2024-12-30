import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Get arrays of usernames and passwords
    const adminUsernames = process.env.ADMIN_USERNAMES.split(',');
    const adminPasswords = process.env.ADMIN_PASSWORDS.split(',');

    // Check if the provided credentials match any pair
    const isValidAdmin = adminUsernames.some((adminUsername, index) => 
      adminUsername === username && adminPasswords[index] === password
    );

    // Check credentials against environment variables
    if (isValidAdmin) {
      // Generate admin token
      const token = jwt.sign(
        { role: 'admin', username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Create response with token
      const response = NextResponse.json({
        success: true,
        token
      });

      // Set HTTP-only cookie
      response.cookies.set('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 