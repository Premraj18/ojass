"use client";
import React, { useEffect, useState } from "react";
import Hero from '@/components/Hero'
import About from '@/components/About'
import Media from '@/components/Media'
import Event from '@/components/Event'
import { registerServiceWorker, subscribeToPushNotifications } from '@/app/lib/pushNotifications';
import toast from 'react-hot-toast';

interface NotificationModalProps {
  onAccept: () => Promise<void>;
  onDecline: () => void;
}

interface DeadlineModalProps {
  onOk: () => void;
  onDoNotShowAgain: () => void;
}

const NotificationModal = ({ onAccept, onDecline }: NotificationModalProps) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-4">Enable Notifications</h3>
      <p className="text-gray-300 mb-6">
        Would you like to receive notifications for latest updates from Ojass?
      </p>
      <div className="flex gap-4 justify-end">
        <button
          onClick={onDecline}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
        >
          Not Now
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enable
        </button>
      </div>
    </div>
  </div>
);

const DeadlineModal = ({ onOk, onDoNotShowAgain }: DeadlineModalProps) => {
  const calculateDaysRemaining = () => {
    const deadline = new Date('2025-01-31');
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-md">
      <div className="bg-black/60 rounded-lg p-8 max-w-md w-full shadow-2xl border-2 border-red-500/80 animate-[pulse_2s_ease-in-out_infinite]">
        <div className="flex items-center justify-center mb-6">
          <div className="text-red-500 text-6xl animate-[bounce_1.5s_ease-in-out_infinite]">⚠️</div>
        </div>
        <h3 className="text-4xl font-extrabold text-center text-white mb-4 tracking-wide">
          <span className="text-red-500">URGENT!</span> Registration Deadline
        </h3>
        <div className="border-l-4 border-yellow-500 pl-4 py-2 mb-6 bg-yellow-500/20">
          <p className="text-yellow-300 text-xl font-semibold mb-2 tracking-wide">
            Only {daysRemaining} days remaining!
          </p>
          <p className="text-gray-200 text-lg tracking-wide">
            Registration closes on <span className="text-red-400 font-bold">January 31st, 2025</span>
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <a 
            href="https://ojass.org/signup" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-red-500 hover:to-orange-500"
          >
            <span className="relative text-xl font-bold text-white tracking-[4px] uppercase group-hover:tracking-[6px] transition-all">
              Register Now 🚀
            </span>
          </a>
        </div>
        <div className="flex gap-4 justify-end border-t border-white/40 pt-4">
          <button
            onClick={onDoNotShowAgain}
            className="px-6 py-2 text-gray-200 hover:text-white transition-colors tracking-wide"
          >
            Don't Show Again
          </button>
          <button
            onClick={onOk}
            className="px-6 py-2 border-2 border-white/50 bg-black/40 rounded-full hover:bg-black/60 hover:border-white/70 transition-all text-white tracking-wide"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);

  const initializeNotifications = async () => {
    try {
      console.log('Initializing notifications...');
      const registration = await registerServiceWorker();
      console.log('Service Worker registered successfully');
      await subscribeToPushNotifications(registration);
      toast.success('Notifications enabled successfully!');
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      toast.error('Failed to enable notifications');
    }
  };

  useEffect(() => {
    const checkAndRequestNotifications = async () => {
      console.log('Checking notification support...');
      
      if (!window.isSecureContext) {
        console.log('Not in secure context - notifications require HTTPS');
        return;
      }

      if (!('Notification' in window)) {
        console.log('Notifications not supported');
        return;
      }

      if (!('serviceWorker' in navigator)) {
        console.log('Service Workers not supported');
        return;
      }

      const permission = Notification.permission;
      console.log('Current notification permission:', permission);

      if (permission === 'granted') {
        await initializeNotifications();
        return;
      }

      if (permission === 'denied') {
        return;
      }

      const hasVisited = localStorage.getItem('hasVisitedBefore');
      
      if (!hasVisited) {
        localStorage.setItem('hasVisitedBefore', 'true');
        return;
      }

      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    };

    checkAndRequestNotifications();
  }, []);

  useEffect(() => {
    const hideDeadlineModal = localStorage.getItem('hideDeadlineModal');
    if (!hideDeadlineModal) {
      setShowDeadlineModal(true);
    }
  }, []);

  const handleAcceptNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await initializeNotifications();
      } else {
        toast.error('Please enable notifications in your browser settings');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      toast.error('Failed to enable notifications');
    } finally {
      setShowModal(false);
    }
  };

  const handleDeadlineOk = () => {
    setShowDeadlineModal(false);
  };

  const handleDoNotShowAgain = () => {
    localStorage.setItem('hideDeadlineModal', 'true');
    setShowDeadlineModal(false);
  };

  return (
    <>
      <Media/>
      <div className="">
        <Hero />
      </div>
      {showModal && (
        <NotificationModal
          onAccept={handleAcceptNotifications}
          onDecline={() => setShowModal(false)}
        />
      )}
      {showDeadlineModal && (
        <DeadlineModal
          onOk={handleDeadlineOk}
          onDoNotShowAgain={handleDoNotShowAgain}
        />
      )}
    </>
  );
}
