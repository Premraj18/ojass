"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import eventData from '@/app/event/event.json';
import toast from 'react-hot-toast';

const EventsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      setUser(JSON.parse(userData));
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleView = (eventIndex, subEventIndex) => {
    router.push(`/event/${eventIndex}/${subEventIndex}`);
  };

  const handleRegister = async (event) => {
    if (!user.paid) {
      toast.error('Please complete your registration payment first');
      return;
    }

    try {
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

      if (res.ok) {
        toast.success('Successfully registered for the event!');
        // Update local user data
        const updatedUser = { ...user, events: [...(user.events || []), event.id] };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to register for event');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen w-full pt-20 pb-10 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/90 top-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">OJASS Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventData.flat().map((event, subIndex) => {
            const eventIndex = eventData.findIndex(category => 
              category.some(e => e.id === event.id)
            );
            const isRegistered = user.events?.includes(event.id);

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
                    onClick={() => handleRegister(event)}
                    disabled={!user.paid || isRegistered}
                    className={`flex-1 px-4 py-2 rounded-full transition-colors ${
                      isRegistered 
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : user.paid
                          ? 'bg-white text-blue-600 hover:bg-gray-100'
                          : 'bg-gray-500 text-white cursor-not-allowed'
                    }`}
                  >
                    {isRegistered ? 'Registered' : 'Register'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsPage; 