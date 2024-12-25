"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import eventData from '@/app/event/event.json';
import toast from 'react-hot-toast';

const MyEventsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Get registered events details
      const userEvents = parsedUser.events || [];
      const eventsDetails = eventData.flat().filter(event => 
        userEvents.includes(event.id)
      );
      setRegisteredEvents(eventsDetails);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleView = (eventIndex, subEventIndex) => {
    router.push(`/event/${eventIndex}/${subEventIndex}`);
  };

  const handleUnregister = async (event) => {
    const confirmUnregister = window.confirm('Are you sure you want to unregister from this event?');
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

      if (res.ok) {
        // Update local state and storage
        const updatedEvents = registeredEvents.filter(e => e.id !== event.id);
        setRegisteredEvents(updatedEvents);
        
        const updatedUser = {
          ...user,
          events: user.events.filter(id => id !== event.id)
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        toast.success('Successfully unregistered from event');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to unregister from event');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (!user?.paid) {
    return (
      <div className="min-h-screen w-full pt-20 pb-10 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
        <div className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/90 top-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Complete Registration First</h1>
          <p>Please complete your registration payment to register for events.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pt-20 pb-10 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/90 top-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">My Events</h1>

        {registeredEvents.length === 0 ? (
          <div className="text-center text-white">
            <p className="mb-4">You haven't registered for any events yet.</p>
            <button
              onClick={() => router.push('/dashboard/events')}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.map((event) => {
              const eventIndex = eventData.findIndex(category => 
                category.some(e => e.id === event.id)
              );
              const subIndex = eventData[eventIndex].findIndex(e => e.id === event.id);

              return (
                <div 
                  key={event.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4"
                >
                  <img 
                    src={event.img} 
                    alt={event.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                  <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                  
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleView(eventIndex, subIndex)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </button>
                    
                    <button
                      onClick={() => handleUnregister(event)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      Unregister
                    </button>
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