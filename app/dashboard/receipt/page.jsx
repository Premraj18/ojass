"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

const ReceiptPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      const parsedUser = JSON.parse(userData);
      console.log('Loaded user data:', parsedUser); // Debug log

      if (!parsedUser.paid) {
        router.push('/dashboard');
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error('Error loading receipt:', error);
      router.push('/dashboard');
    }
  }, [router]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return <Receipt user={user} onClose={() => router.push('/dashboard')} />;
};

export default ReceiptPage; 