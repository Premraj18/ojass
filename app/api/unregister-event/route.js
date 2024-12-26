import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDB();
    
    const { userId, eventId } = await req.json();

    // Find user and check if they're registered
    const user = await User.findById(userId);
    if (!user || !user.events?.includes(eventId)) {
      return NextResponse.json(
        { error: 'Event registration not found' },
        { status: 404 }
      );
    }

    // Get event details
    const eventDetails = user.eventDetails?.find(d => d.eventId === eventId);
    
    // If user is team leader, unregister all team members
    if (eventDetails?.isTeamLeader && eventDetails.teamMembers?.length > 0) {
      // Find and update all team members
      await Promise.all([
        // Remove event from team members
        User.updateMany(
          { 
            ojassId: { $in: eventDetails.teamMembers }
          },
          {
            $pull: {
              events: eventId,
              eventDetails: { eventId: eventId }
            }
          }
        ),
        // Remove team members from the event
        User.updateMany(
          { 
            'eventDetails.teamMembers': user.ojassId,
            'eventDetails.eventId': eventId
          },
          {
            $pull: {
              events: eventId,
              eventDetails: { eventId: eventId }
            }
          }
        )
      ]);
    }
    // If user is team member, only allow if team is being unregistered by leader
    else if (eventDetails?.isTeamMember) {
      return NextResponse.json(
        { error: 'Only team leaders can unregister the team' },
        { status: 403 }
      );
    }

    // Update the user (whether team leader or individual participant)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          events: eventId,
          eventDetails: { eventId: eventId }
        }
      },
      { new: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: eventDetails?.isTeamLeader 
        ? 'Successfully unregistered team from event'
        : 'Successfully unregistered from event'
    });
  } catch (error) {
    console.error('Event unregistration error:', error);
    return NextResponse.json(
      { error: 'Failed to unregister from event' },
      { status: 500 }
    );
  }
} 