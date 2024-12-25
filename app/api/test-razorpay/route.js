import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function GET() {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Test creating a minimal order
    const testOrder = await razorpay.orders.create({
      amount: 100, // ₹1
      currency: 'INR',
      receipt: 'test_receipt'
    });

    return NextResponse.json({
      success: true,
      message: 'Razorpay configuration is valid',
      keyId: process.env.RAZORPAY_KEY_ID?.slice(0, 10) + '...',
      hasSecret: !!process.env.RAZORPAY_SECRET,
      testOrder: {
        id: testOrder.id,
        amount: testOrder.amount,
        currency: testOrder.currency
      }
    });
  } catch (error) {
    console.error('Razorpay test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      keyId: process.env.RAZORPAY_KEY_ID?.slice(0, 10) + '...',
      hasSecret: !!process.env.RAZORPAY_SECRET
    });
  }
} 