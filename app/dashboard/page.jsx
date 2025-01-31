// NEXT_PUBLIC_PAYMENT_ACTIVE payment can only be activated when this is true

"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Receipt from '@/components/Receipt';
import { useRazorpay } from '@/hooks/useRazorpay';
import Loader from '@/components/Loader';
import authScreenAtom from '@/atom/userAtom';
import { useSetRecoilState } from 'recoil'
import Image from 'next/image';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const razorpayLoaded = useRazorpay();
  const setauthScreen = useSetRecoilState(authScreenAtom)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const response = await fetch('/api/notifications/list');
        const data = await response.json();
        
        if (response.ok) {
          const currentCount = data.notifications.length;
          setNotificationCount(currentCount);
          
          // Get last seen count from localStorage
          const lastSeenCount = parseInt(localStorage.getItem('lastSeenNotificationCount') || '0');
          
          // Calculate new notifications
          if (currentCount > lastSeenCount) {
            setHasNewNotifications(true);
            setNewNotificationCount(currentCount - lastSeenCount);
          } else {
            setHasNewNotifications(false);
            setNewNotificationCount(0);
          }
        }
      } catch (error) {
        console.error('Error checking notifications:', error);
      }
    };

    // Check immediately and then every minute
    checkNotifications();
    const interval = setInterval(checkNotifications, 60000);

    return () => clearInterval(interval);
  }, []);

  const getRegistrationInfo = () => {
    const now = new Date();
    const earlyBirdDeadline = new Date(process.env.NEXT_PUBLIC_EARLY_REGISTRATION_END_DATE);
    const prices = {
      nitJsrEarly: parseInt(process.env.NEXT_PUBLIC_NITJSR_EARLY_PRICE) || 1,
      nitJsrRegular: parseInt(process.env.NEXT_PUBLIC_NITJSR_REGULAR_PRICE) || 2,
      otherEarly: parseInt(process.env.NEXT_PUBLIC_OTHER_EARLY_PRICE) || 3,
      otherRegular: parseInt(process.env.NEXT_PUBLIC_OTHER_REGULAR_PRICE) || 4
    };

    const isEarlyBird = now <= earlyBirdDeadline;
    const phase = isEarlyBird ? 'Early Bird' : 'Regular';
    const daysLeft = isEarlyBird ?
      Math.ceil((earlyBirdDeadline - now) / (1000 * 60 * 60 * 24)) : 0;

    return {
      phase,
      daysLeft,
      amount: user?.isNitJsr
        ? (isEarlyBird ? prices.nitJsrEarly : prices.nitJsrRegular)
        : (isEarlyBird ? prices.otherEarly : prices.otherRegular)
    };
  };

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }

    try {
      setIsProcessing(true);

      // Get user ID from localStorage to ensure we have the latest data
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData?._id) {
        throw new Error('Session expired. Please login again.');
      }

      // Get prices from environment variables with fallbacks
      const prices = {
        nitJsrEarly: parseInt(process.env.NEXT_PUBLIC_NITJSR_EARLY_PRICE) || 1,
        nitJsrRegular: parseInt(process.env.NEXT_PUBLIC_NITJSR_REGULAR_PRICE) || 2,
        otherEarly: parseInt(process.env.NEXT_PUBLIC_OTHER_EARLY_PRICE) || 3,
        otherRegular: parseInt(process.env.NEXT_PUBLIC_OTHER_REGULAR_PRICE) || 4
      };

      const amount = userData.isNitJsr
        ? (registrationInfo.phase === 'Early Bird' ? prices.nitJsrEarly : prices.nitJsrRegular)
        : (registrationInfo.phase === 'Early Bird' ? prices.otherEarly : prices.otherRegular);

      // Create payment order
      const createRes = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData._id,
          amount: amount
        }),
      });

      const data = await createRes.json();

      if (!createRes.ok) {
        throw new Error(data.error || 'Payment initialization failed');
      }

      const { orderId, amount: razorpayAmount, currency, keyId } = data;

      const options = {
        key: keyId,
        amount: razorpayAmount,
        currency: currency,
        name: "DigiCraft",
        description: "Registration Fee",
        order_id: orderId,
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...response,
                userId: userData._id,
                amount: razorpayAmount / 100
              }),
            });

            const data = await verifyRes.json();
            if (data.success) {
              localStorage.setItem('user', JSON.stringify(data.user));
              setUser(data.user);
              alert('Payment successful!');
            } else {
              throw new Error(data.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.message || 'Payment initialization failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleEventAction = (action) => {
    switch (action) {
      case 'register':
        router.push('/dashboard/events');
        break;
      case 'view':
        router.push('/dashboard/my-events');
        break;
      default:
        break;
    }
  };

  if (!user) return null;

  const registrationInfo = getRegistrationInfo();

  return (
    <div className="min-h-screen w-full pt-20 pb-10 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/90 top-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 py-8"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user.name}!</h1>
            <p className="text-gray-300">Your OJASS ID: {user.ojassId}</p>
            <p className="text-gray-300 mt-1">{user.college}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-gray-400">Name:</span> {user.name}</p>
                <p><span className="text-gray-400">Email:</span> {user.email}</p>
                <p><span className="text-gray-400">Phone:</span> {user.phone}</p>
                <p><span className="text-gray-400">OJASS ID:</span> {user.ojassId}</p>
                <p><span className="text-gray-400">College:</span> {user.college}</p>
                <p><span className="text-gray-400">Student Type:</span> {user.isNitJsr ? 'NIT Jamshedpur Student' : 'Other College Student'}</p>
                <p>
                  <span className="text-gray-400">Registration Phase:</span>{' '}
                  <span className={registrationInfo.phase === 'Early Bird' ? 'text-green-400' : 'text-yellow-400'}>
                    {registrationInfo.phase}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Payment Status:</span>{' '}
                  <span className={user.paid ? 'text-green-400' : 'text-red-400'}>
                    {user.paid ? "Paid" : "Not Paid"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Registration Fee:</span>{' '}
                  {registrationInfo.amount}
                </p>
                {!user.paid && (
                  <p className="text-sm text-yellow-400">
                    {registrationInfo.phase === 'Early Bird'
                      ? '* Early bird offer ends on January 10th, 2025'
                      : '* Regular registration fee applies'}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-3">ID Card</h3>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    width={400} 
                    height={100}
                    src={user.idCardUrl}
                    alt="College ID Card"
                    className="w-full max-w-xs mx-auto rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-4">
                {!user.paid && (
                  // NEXT_PUBLIC_PAYMENT_ACTIVE=true
                  process.env.NEXT_PUBLIC_PAYMENT_ACTIVE === 'true' ? (
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing || !razorpayLoaded}
                      className="w-full py-3 px-4 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <Loader />
                      ) : (
                        <>
                          Pay Registration Fee ({registrationInfo.amount})
                          {registrationInfo.phase === 'Early Bird' && (
                            <span className="block text-sm mt-1">Early Bird Offer!</span>
                          )}
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      className="w-full py-3 px-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    >
                      Payment is not active
                    </button>
                  )
                )}
                {user.paid && (
                  <button
                    onClick={() => router.push('/dashboard/receipt')}
                    className="w-full py-3 px-4 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
                  >
                    View Receipt
                  </button>
                )}
                <button
                  onClick={() => handleEventAction('register')}
                  className="w-full py-3 px-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!user.paid}
                >
                  {user.paid ? 'Register for Events' : 'Complete Registration First'}
                </button>
                <button
                  onClick={() => handleEventAction('view')}
                  className="w-full py-3 px-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!user.paid}
                >
                  {user.paid ? 'View My Events' : 'Complete Registration First'}
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('lastSeenNotificationCount', notificationCount);
                    router.push('/dashboard/notifications');
                  }}
                  className="relative w-full py-3 px-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors group"
                >
                  View Notifications
                  {hasNewNotifications && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-500 text-white text-xs items-center justify-center">
                        {newNotificationCount}
                      </span>
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    router.push('/login');
                    setauthScreen('true');
                  }}
                  className="w-full py-3 px-4 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information Card - Full Width */}
          <div className="mt-6 bg-white/5 rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              Contact Information
            </h2>

            {/* WhatsApp Group */}
            <div className="bg-white/[0.03] p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-green-400 flex-shrink-0" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-white mb-2">Official WhatsApp Group</h3>
                  <p className="text-gray-400 text-base mb-3">All participants must join the official WhatsApp group for important updates</p>
                  <a 
                    href="https://chat.whatsapp.com/CRaQY5WMNoH91FgGLHLXuv" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1F794E] text-white px-6 py-2.5 rounded-lg hover:bg-[#1F794E]/90 transition-colors text-base font-medium"
                  >
                    Join WhatsApp Group
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Support Contacts Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] p-6 rounded-xl">
                <h3 className="text-xl font-medium text-white mb-3">Technical Secretary</h3>
                <a href="tel:+918863832703" className="text-[#4d9fff] hover:text-[#4d9fff]/80 transition-colors flex items-center gap-2 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  +91 8863832703
                </a>
                <p className="text-gray-400 text-base mt-2">Vishal Raj</p>
              </div>

              <div className="bg-white/[0.03] p-6 rounded-xl">
                <h3 className="text-xl font-medium text-white mb-3">Payment Support</h3>
                <a href="tel:+918299797516" className="text-[#4d9fff] hover:text-[#4d9fff]/80 transition-colors flex items-center gap-2 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  +91 8299797516
                </a>
                <p className="text-gray-400 text-base mt-2">Ayush Kumar</p>
              </div>

              <div className="bg-white/[0.03] p-6 rounded-xl">
                <h3 className="text-xl font-medium text-white mb-3">Registration Support</h3>
                <a href="tel:+919153338951" className="text-[#4d9fff] hover:text-[#4d9fff]/80 transition-colors flex items-center gap-2 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  +91 9153338951
                </a>
                <p className="text-gray-400 text-base mt-2">Prem Raj</p>
              </div>

              <div className="bg-white/[0.03] p-6 rounded-xl">
                <h3 className="text-xl font-medium text-white mb-3">Email Support</h3>
                <a href="mailto:digicraft.one@gmail.com" className="text-[#4d9fff] hover:text-[#4d9fff]/80 transition-colors flex items-center gap-2 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  digicraft.one@gmail.com
                </a>
                <p className="text-gray-400 text-base mt-2">Ojass Team</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Receipt Modal */}
      {showReceipt && user.paid && (
        <Receipt user={user} onClose={() => setShowReceipt(false)} />
      )}
    </div>
  );
};

export default Dashboard; 