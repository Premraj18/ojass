import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    
    const { email, password } = await req.json();

    // Find user
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = jwt.sign(
      { 
        userId: user._id,
        ojassId: user.ojassId,
        name: user.name,
        college: user.college,
        isNitJsr: user.isNitJsr
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return complete user object with payment details
    return NextResponse.json({
      token,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        ojassId: user.ojassId,
        college: user.college,
        isNitJsr: user.isNitJsr,
        paid: user.paid,
        paidAmount: user.payment?.amount || user.paidAmount,
        registrationDate: user.registrationDate,
        idCardUrl: user.idCardUrl,
        registrationPhase: user.registrationPhase,
        events: user.events || [],
        eventDetails: user.eventDetails || [],
        payment: {
          receiptId: user.payment?.receiptId || user.paymentId,
          razorpayOrderId: user.payment?.razorpayOrderId,
          razorpayPaymentId: user.payment?.razorpayPaymentId,
          amount: user.payment?.amount || user.paidAmount,
          date: user.payment?.date || user.paymentDate,
          status: user.payment?.status || (user.paid ? 'completed' : 'pending')
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 