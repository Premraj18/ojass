"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminNav from '@/components/admin/AdminNav';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

// Dynamic import of the editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const NotificationsPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchRecentNotifications = async () => {
    try {
      setLoading(true);
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/notifications/list?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store',
        next: { revalidate: 0 }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      setRecentNotifications(data.notifications.slice(0, 5)); // Show last 5 notifications
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load recent notifications');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and polling setup
  useEffect(() => {
    fetchRecentNotifications();
    
    // Poll for updates every 10 seconds
    const intervalId = setInterval(fetchRecentNotifications, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Refresh on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchRecentNotifications();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Refresh on window focus
  useEffect(() => {
    const handleFocus = () => {
      fetchRecentNotifications();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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

  const sendNotification = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSending(true);

      const payload = {
        title: title.trim(),
        body: content.trim(),
        image: imagePreview
      };

      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to send notification');

      toast.success('Notification sent successfully!');
      setTitle('');
      setContent('');
      setImage(null);
      setImagePreview('');
      
      // Force immediate refresh of notifications
      await fetchRecentNotifications();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send notification');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNav />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
            {/* Send Notification Form */}
            <div className="bg-gray-800 rounded-xl p-4 md:p-6 h-fit">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Send Notification</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter notification title"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <div className="prose-editor-dark">
                    <ReactQuill
                      value={content}
                      onChange={setContent}
                      placeholder="Enter notification content"
                      theme="snow"
                      className="bg-gray-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Image (Optional)
                  </label>
                  <div className="flex flex-col gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="text-gray-300">Choose Image</span>
                    </label>
                    
                    {imagePreview && (
                      <div className="relative w-full aspect-video">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="rounded-lg object-cover"
                        />
                        <button
                          onClick={() => {
                            setImage(null);
                            setImagePreview('');
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={sendNotification}
                  disabled={isSending || !title.trim() || !content.trim()}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isSending ? 'Sending...' : 'Send Notification'}
                </button>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-gray-800 rounded-xl p-4 md:p-6 h-[82vh] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">Recent Notifications</h2>
                <button
                  onClick={fetchRecentNotifications}
                  className="text-white hover:text-gray-300 transition-colors"
                  title="Refresh notifications"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center flex-grow">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : recentNotifications.length === 0 ? (
                <div className="text-center py-8 flex-grow">
                  <p className="text-gray-400">No notifications sent yet</p>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto flex-grow custom-scrollbar">
                  {recentNotifications.map((notification) => (
                    <div
                      key={`${notification._id}-${notification.updatedAt}`}
                      className="bg-gray-700/50 rounded-lg p-4"
                    >
                      <div className="flex flex-col gap-2">
                        {notification.imageUrl && (
                          <div className="relative w-full aspect-video">
                            <Image
                              src={notification.imageUrl}
                              alt="Notification image"
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                            <span className="text-xs text-gray-400">
                              {formatDate(notification.createdAt)}
                            </span>
                          </div>
                          <div 
                            className="text-gray-300 text-sm prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: notification.content }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .prose-editor-dark .ql-toolbar.ql-snow {
          border-color: #4B5563 !important;
          background: #374151 !important;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        .prose-editor-dark .ql-container.ql-snow {
          border-color: #4B5563 !important;
          background: #374151 !important;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          min-height: 150px;
        }

        .prose-editor-dark .ql-editor {
          color: #E5E7EB !important;
        }

        .prose-editor-dark .ql-editor.ql-blank::before {
          color: #9CA3AF !important;
        }

        .prose-editor-dark .ql-stroke {
          stroke: #E5E7EB !important;
        }

        .prose-editor-dark .ql-fill {
          fill: #E5E7EB !important;
        }

        .prose-editor-dark .ql-picker {
          color: #E5E7EB !important;
        }

        .prose-editor-dark .ql-picker-options {
          background-color: #374151 !important;
          border-color: #4B5563 !important;
        }

        .prose-editor-dark .ql-picker-item:hover {
          background-color: #4B5563 !important;
          color: #FFFFFF !important;
        }

        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.2);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.7);
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(75, 85, 99, 0.5) rgba(75, 85, 99, 0.2);
        }
      `}</style>
    </div>
  );
};

export default NotificationsPage; 