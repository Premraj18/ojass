"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import eventData from '@/app/event/event.json';
import toast from 'react-hot-toast';
import TeamRegistrationModal from '@/components/TeamRegistrationModal';
import Image from 'next/image';
const eventCategory = {
  "0": "Coding Chronicles",
  "1": "AquaBots Arena",
  "2": "Brain Busters",
  "3": "Case Quest",
  "4": "Crypto Craft",
  "5": "Department Events",
  "6": "Game Crafts",
  "7": "Lens Craft",
  "8": "Market Mavericks",
  "9": "Robo Realm",
  "10": "Skyward Bound",
  "11": "Verse Voyage",
}
const EventsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeringEventId, setRegisteringEventId] = useState(null);

  const refreshUserData = useCallback(async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData?._id) return;

      const res = await fetch(`/api/user/refresh?userId=${userData._id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // Only update localStorage and state if there are changes
      if (JSON.stringify(userData) !== JSON.stringify(data.user)) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      setUser(JSON.parse(userData));
    };

    checkAuth();

    // Set up polling for user data updates
    const pollInterval = setInterval(refreshUserData, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(pollInterval);
    };
  }, [router, refreshUserData]);

  const handleView = (event) => {
    const [category, index] = event.id.split('-');
    router.push(`/event/${category}/${index}`);
  };

  const handleRegister = async (event) => {
    if (!user.paid) {
      toast.error('Please complete your registration payment first');
      return;
    }

    // Check if user is already registered
    const isRegistered = user.events?.includes(event.id);
    if (isRegistered) {
      toast.error('Already registered for this event');
      return;
    }

    // For team events
    if (parseInt(event.teamSizeMin) > 1) {
      setSelectedEvent(event);
      return;
    }

    // For individual events
    try {
      setRegisteringEventId(event.id);
      const res = await fetch('/api/register-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          eventId: event.id,
          eventName: event.name
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // Update local user data with complete updated user object
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      toast.success('Successfully registered for event!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRegisteringEventId(null);
    }
  };

  const handleTeamRegistrationSuccess = (data) => {
    // Update local user data with complete updated user object
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setSelectedEvent(null);
    toast.success('Successfully registered team for event!');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen w-full pt-20 pb-10 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Events</h1>
        
        {eventData.map((categoryEvents, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {eventCategory[categoryIndex]}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryEvents.map((event) => {
                const isRegistered = user.events?.includes(event.id);
                const isTeamEvent = parseInt(event.teamSizeMin) > 1;
                const eventDetails = user.eventDetails?.find(e => e.eventId === event.id);
                const isRegistering = registeringEventId === event.id;
                
                return (
                  <div 
                    key={event.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden"
                  >
                    <Image 
                      width={400} 
                      height={100}
                      src={event.img} 
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                      
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {event.description}
                      </p>

                      <div className="text-sm text-gray-400">
                        {isTeamEvent ? (
                          <p>Team Size: {event.teamSizeMin}-{event.teamSizeMax} members</p>
                        ) : (
                          <p>Individual Event</p>
                        )}
                        {isRegistered && eventDetails?.isTeamLeader && (
                          <p className="text-green-400 mt-1">Team Leader</p>
                        )}
                        {isRegistered && eventDetails?.isTeamMember && (
                          <p className="text-green-400 mt-1">Team Member (Leader: {eventDetails.teamLeader})</p>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => handleView(event)}
                          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                        >
                          View Details
                        </button>
                        
                        <button
                          onClick={() => handleRegister(event)}
                          disabled={!user.paid || isRegistered || isRegistering}
                          className={`flex-1 px-4 py-2 rounded-full transition-colors ${
                            isRegistered 
                              ? 'bg-green-500 text-white cursor-not-allowed'
                              : user.paid
                                ? 'bg-white text-blue-600 hover:bg-gray-100'
                                : 'bg-gray-500 text-white cursor-not-allowed'
                          }`}
                        >
                          {isRegistering 
                            ? 'Registering...' 
                            : isRegistered 
                              ? 'Registered' 
                              : isTeamEvent 
                                ? 'Register Team' 
                                : 'Register'
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <TeamRegistrationModal
          event={selectedEvent}
          user={user}
          onClose={() => setSelectedEvent(null)}
          onSuccess={handleTeamRegistrationSuccess}
        />
      )}
    </div>
  );
};

export default EventsPage; 