import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import crypto from 'crypto';

export async function POST(req) {
  try {
    await connectDB();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userId,
      amount
    } = await req.json();

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Generate receipt ID
    const receiptId = `RCPT-${Date.now().toString().slice(-6)}-${razorpay_payment_id.slice(-4)}`;
    const paymentDate = new Date();

    // Update user with payment details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        paid: true,
        paidAmount: amount,
        paymentId: receiptId,
        paymentDate: paymentDate,
        payment: {
          receiptId: receiptId,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          amount: amount,
          date: paymentDate,
          status: 'completed'
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return complete user object
    return NextResponse.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        ojassId: updatedUser.ojassId,
        college: updatedUser.college,
        isNitJsr: updatedUser.isNitJsr,
        paid: updatedUser.paid,
        paidAmount: updatedUser.payment.amount,
        registrationDate: updatedUser.registrationDate,
        idCardUrl: updatedUser.idCardUrl,
        registrationPhase: updatedUser.registrationPhase,
        payment: {
          receiptId: updatedUser.payment.receiptId,
          razorpayOrderId: updatedUser.payment.razorpayOrderId,
          razorpayPaymentId: updatedUser.payment.razorpayPaymentId,
          amount: updatedUser.payment.amount,
          date: updatedUser.payment.date,
          status: updatedUser.payment.status
        }
      }
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
} 