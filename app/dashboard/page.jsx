"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

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

  if (!user) return null;

  return (
    <div className="min-h-screen w-full pt-20 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 py-8"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user.name}!</h1>
            <p className="text-gray-300">Your OJASS ID: {user.ojassId}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-gray-400">Name:</span> {user.name}</p>
                <p><span className="text-gray-400">Email:</span> {user.email}</p>
                <p><span className="text-gray-400">OJASS ID:</span> {user.ojassId}</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full py-2 px-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                  Register for Events
                </button>
                <button className="w-full py-2 px-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                  View My Events
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    router.push('/login');
                  }}
                  className="w-full py-2 px-4 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 