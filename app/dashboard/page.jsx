"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Receipt from '@/components/Receipt';
import { useRazorpay } from '@/hooks/useRazorpay';
import Loader from '@/components/Loader';
import authScreenAtom from '@/atom/userAtom';
import { useSetRecoilState } from 'recoil'

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const getRegistrationInfo = () => {
    const now = new Date();
    const earlyBirdDeadline = new Date('2025-01-10');
    const prices = {
      nitJsrEarly: parseInt(process.env.NITJSR_EARLY_PRICE) || 1,
      nitJsrRegular: parseInt(process.env.NITJSR_REGULAR_PRICE) || 2,
      otherEarly: parseInt(process.env.OTHER_EARLY_PRICE) || 3,
      otherRegular: parseInt(process.env.OTHER_REGULAR_PRICE) || 4
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
        nitJsrEarly: parseInt(process.env.NITJSR_EARLY_PRICE) || 1,
        nitJsrRegular: parseInt(process.env.NITJSR_REGULAR_PRICE) || 2,
        otherEarly: parseInt(process.env.OTHER_EARLY_PRICE) || 3,
        otherRegular: parseInt(process.env.OTHER_REGULAR_PRICE) || 4
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
                    {registrationInfo.status}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Registration Fee:</span>{' '}
                  {registrationInfo.amount}
                </p>
                {!user.paid && (
                  <p className="text-sm text-yellow-400">
                    {registrationInfo.phase === 'Early Bird' 
                      ? '* Early bird offer ends on January 1st, 2024' 
                      : '* Regular registration fee applies'}
                  </p>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-3">ID Card</h3>
                <div className="rounded-lg overflow-hidden">
                  <img 
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