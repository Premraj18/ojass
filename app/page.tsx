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

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const initializeNotifications = async () => {
    try {
      const registration = await registerServiceWorker();
      await subscribeToPushNotifications(registration);
      toast.success('Notifications enabled successfully!');
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      toast.error('Failed to enable notifications');
    }
  };

  useEffect(() => {
    const checkAndRequestNotifications = async () => {
      // Check if notifications are supported
      if (!('Notification' in window)) {
        console.log('Notifications not supported');
        return;
      }

      // Check if service workers are supported
      if (!('serviceWorker' in navigator)) {
        console.log('Service Workers not supported');
        return;
      }

      // Get the current permission state
      const permission = Notification.permission;

      // If permission is already granted, initialize
      if (permission === 'granted') {
        await initializeNotifications();
        return;
      }

      // If permission is denied, don't show modal
      if (permission === 'denied') {
        return;
      }

      // Check if user has visited before
      const hasVisited = localStorage.getItem('hasVisitedBefore');
      
      // If first visit, just mark as visited
      if (!hasVisited) {
        localStorage.setItem('hasVisitedBefore', 'true');
        return;
      }

      // If it's not the first visit and permission is not granted/denied, show modal
      setTimeout(() => {
        setShowModal(true);
      }, 3000); // Wait 3 seconds before showing the modal
    };

    // Run the check
    checkAndRequestNotifications();
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
    </>
  );
}
