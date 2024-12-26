"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import eventData from '@/app/event/event.json';
import toast from 'react-hot-toast';

const MyEventsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const fetchUserData = useCallback(async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData?._id) {
        router.push('/login');
        return;
      }

      const res = await fetch(`/api/user/refresh?userId=${userData._id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // Update local storage with fresh data
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      // Get registered events details
      const userEvents = data.user.events || [];
      const eventsDetails = eventData.flat().filter(event => 
        userEvents.includes(event.id)
      ).map(event => {
        const details = data.user.eventDetails?.find(d => d.eventId === event.id);
        return {
          ...event,
          registrationDetails: details
        };
      });
      
      setRegisteredEvents(eventsDetails);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleView = (eventIndex, subEventIndex) => {
    router.push(`/event/${eventIndex}/${subEventIndex}`);
  };

  const handleUnregister = async (event) => {
    // Don't allow unregistering from team events if you're not the leader
    const eventDetails = user.eventDetails?.find(d => d.eventId === event.id);
    if (eventDetails?.isTeamMember) {
      toast.error('Only team leaders can unregister the team');
      return;
    }

    const confirmUnregister = window.confirm(
      eventDetails?.isTeamLeader 
        ? 'This will unregister the entire team. Are you sure?' 
        : 'Are you sure you want to unregister from this event?'
    );
    
    if (!confirmUnregister) return;

    try {
      const res = await fetch('/api/unregister-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          eventId: event.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // Update local storage with fresh data
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      // Remove event from displayed list
      setRegisteredEvents(prev => prev.filter(e => e.id !== event.id));
      
      toast.success('Successfully unregistered from event');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen w-full pt-20 pb-10 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">My Registered Events</h1>
        
        {registeredEvents.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>You haven't registered for any events yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.map((event) => {
              const details = event.registrationDetails;
              const isTeamEvent = parseInt(event.teamSizeMin) > 1;

              return (
                <div 
                  key={event.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden"
                >
                  <img 
                    src={event.img} 
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                    
                    <div className="text-sm text-gray-400 space-y-2">
                      {isTeamEvent && (
                        <div>
                          {details?.isTeamLeader ? (
                            <>
                              <p className="text-green-400">Team Leader</p>
                              <p>Team Members:</p>
                              <ul className="list-disc pl-4">
                                {details.teamMembers.map((memberId, idx) => (
                                  <li key={idx}>{memberId}</li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <p className="text-green-400">
                              Team Member (Leader: {details?.teamLeader})
                            </p>
                          )}
                        </div>
                      )}
                      <p>Registered on: {new Date(details?.registrationDate).toLocaleDateString()}</p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          const [category, index] = event.id.split('-');
                          handleView(category, index);
                        }}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                      >
                        View Details
                      </button>
                      
                      {(!isTeamEvent || details?.isTeamLeader) && (
                        <button
                          onClick={() => handleUnregister(event)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                          Unregister
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEventsPage; 