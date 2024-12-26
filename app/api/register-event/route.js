import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDB();
    
    const { userId, eventId, eventName, teamMembers = [] } = await req.json();

    // Find leader and check payment status
    const leader = await User.findById(userId);
    if (!leader || !leader.paid) {
      return NextResponse.json(
        { error: 'Team leader must complete registration payment first' },
        { status: 403 }
      );
    }

    // Check if leader is already registered
    if (leader.events?.includes(eventId)) {
      return NextResponse.json(
        { error: 'You are already registered for this event' },
        { status: 400 }
      );
    }

    const registrationDate = new Date();

    // For team events
    if (teamMembers.length > 0) {
      // Verify all team members exist and have paid
      const members = await User.find({ 
        ojassId: { $in: teamMembers }
      }).select('paid name ojassId events');
      
      if (members.length !== teamMembers.length) {
        return NextResponse.json(
          { error: 'One or more team members not found' },
          { status: 400 }
        );
      }

      // Check if all members have paid
      const unpaidMember = members.find(m => !m.paid);
      if (unpaidMember) {
        return NextResponse.json(
          { error: `Team member ${unpaidMember.name} hasn't completed payment` },
          { status: 400 }
        );
      }

      // Check if any member is already registered
      const registeredMember = members.find(m => m.events?.includes(eventId));
      if (registeredMember) {
        return NextResponse.json(
          { error: `${registeredMember.name} is already registered for this event` },
          { status: 400 }
        );
      }

      // Register the entire team
      await Promise.all([
        // Update leader's registration
        User.findByIdAndUpdate(
          userId,
          {
            $push: {
              events: eventId,
              eventDetails: {
                eventId,
                eventName,
                registrationDate,
                isTeamLeader: true,
                teamMembers
              }
            }
          }
        ),
        // Update team members' registrations
        ...members.map(member =>
          User.findByIdAndUpdate(
            member._id,
            {
              $push: {
                events: eventId,
                eventDetails: {
                  eventId,
                  eventName,
                  registrationDate,
                  isTeamMember: true,
                  teamLeader: leader.ojassId
                }
              }
            }
          )
        )
      ]);

      // Get updated leader data
      const updatedLeader = await User.findById(userId).select('-password');

      return NextResponse.json({
        success: true,
        user: updatedLeader,
        message: 'Successfully registered team for event'
      });
    }

    // For individual registration
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          events: eventId,
          eventDetails: {
            eventId,
            eventName,
            registrationDate,
            isTeamLeader: false,
            isTeamMember: false
          }
        }
      },
      { new: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      user: updatedUser,
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