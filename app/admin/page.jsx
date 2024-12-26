"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const isAdmin = localStorage.getItem('adminToken');
    if (isAdmin) {
      router.push('/admin/dashboard');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/dashboard');
      } else {
        throw new Error(data.error || 'Authentication failed');
      }
    } catch (error) {
      toast.error(error.message || 'Invalid credentials');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">OJASS Admin</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 block mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <div>
            <label className="text-gray-300 block mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage; 