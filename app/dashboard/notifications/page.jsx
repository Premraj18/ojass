"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/list');
      const data = await response.json();
      
      if (response.ok) {
        setNotifications(data.notifications);
        localStorage.setItem('lastSeenNotificationCount', data.notifications.length.toString());
      } else {
        throw new Error(data.error || 'Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 md:pt-20 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
        <div className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/90 -z-10" />
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/90 -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-6 md:py-8 max-w-4xl"
      >
        <div className="mb-6 md:mb-8 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Notifications</h1>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 text-center">
            <p className="text-gray-300 text-base md:text-lg">No notifications sent yet.</p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {notifications.map((notification) => (
              <motion.div
                key={notification._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6"
              >
                <div className="flex flex-col gap-4">
                  {notification.imageUrl && (
                    <div className="w-full">
                      <div className="relative pt-[56.25%]">
                        <Image
                          src={notification.imageUrl}
                          alt="Notification image"
                          fill
                          className="rounded-lg object-cover absolute inset-0"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg md:text-xl font-semibold text-white break-words">{notification.title}</h2>
                      <span className="text-xs text-gray-400">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                    <div 
                      className="text-gray-300 text-sm md:text-base prose prose-invert max-w-none break-words"
                      dangerouslySetInnerHTML={{ __html: notification.content }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NotificationsPage; 