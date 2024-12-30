import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

async function addContactToBrevo(name, email, college, phone) {
  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name,
          COLLEGE: college,
          PHONE: phone
        },
        listIds: [parseInt(process.env.BREVO_LIST_ID)],
        updateEnabled: true
      })
    });

    if (!response.ok) {
      console.error('Failed to add contact to Brevo:', await response.text());
    }
  } catch (error) {
    console.error('Error adding contact to Brevo:', error);
  }
}

export async function POST(req) {
  try {
    await connectDB();
    
    const { name, email, password, isNitJsr, college, idCardUrl, phone } = await req.json();

    console.log('Received signup data:', { 
      name, 
      email,
      phone,
      isNitJsr, 
      college, 
      hasIdCard: !!idCardUrl 
    }); // Debug log

    // Validate required fields
    if (!name || !email || !password || isNitJsr === undefined || !college || !idCardUrl || !phone) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!email) missingFields.push('email');
      if (!password) missingFields.push('password');
      if (isNitJsr === undefined) missingFields.push('isNitJsr');
      if (!college) missingFields.push('college');
      if (!idCardUrl) missingFields.push('idCardUrl');
      if (!phone) missingFields.push('phone');

      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate phone number format
    if (!/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Please enter a 10-digit number.' },
        { status: 400 }
      );
    }

    // Check if user already exists by email or phone
    const existingUser = await User.findOne({ 
      $or: [
        { email },
        { phone }
      ]
    });
    if (existingUser) {
      return NextResponse.json(
        { error: existingUser.email === email ? 'Email already registered' : 'Phone number already registered' },
        { status: 400 }
      );
    }

    // Create new user with explicit fields
    const userData = {
      name,
      email,
      phone,
      password,
      isNitJsr: Boolean(isNitJsr),
      college: isNitJsr ? 'NIT Jamshedpur' : college,
      idCardUrl,
      registrationDate: new Date(),
      paid: false,
      paidAmount: 0
    };

    console.log('Creating user with data:', userData); // Debug log

    const user = await User.create(userData);

    // Add user to Brevo contact list
    await addContactToBrevo(name, email, userData.college, userData.phone);

    console.log('User created:', user); // Debug log

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        ojassId: user.ojassId,
        name: user.name,
        phone: user.phone,
        college: user.college,
        isNitJsr: user.isNitJsr
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ 
      token,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        ojassId: user.ojassId,
        college: user.college,
        isNitJsr: user.isNitJsr,
        paid: user.paid,
        paidAmount: user.paidAmount,
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
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 