"use client";
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import authScreenAtom from '@/atom/userAtom';
import { useSetRecoilState } from 'recoil'
import Image from 'next/image';

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isNitJsr: false,
    college: '',
    idCard: null,
    referralCode: ''
  });
  const [idCardPreview, setIdCardPreview] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const setauthScreen = useSetRecoilState(authScreenAtom)

  const handleIdCardUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, idCard: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.password || !formData.idCard || !formData.phone) {
        throw new Error('All fields are required');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.isNitJsr && !formData.college) {
        throw new Error('College name is required');
      }

      // Validate phone number format
      if (!/^[0-9]{10}$/.test(formData.phone)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      // First upload the image to Cloudinary
      const imageData = new FormData();
      imageData.append('file', formData.idCard);
      imageData.append('upload_preset', 'ojass_id_cards');

      console.log('Uploading image to Cloudinary...'); // Debug log

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/dm8cs1twk/image/upload`,
        {
          method: 'POST',
          body: imageData
        }
      );

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        console.error('Cloudinary Error:', errorData);
        throw new Error('Failed to upload ID Card: ' + (errorData.error?.message || 'Unknown error'));
      }

      const uploadData = await uploadRes.json();
      console.log('Image upload successful:', uploadData.secure_url); // Debug log

      // Now create the user with the image URL
      const signupData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        isNitJsr: formData.isNitJsr,
        college: formData.isNitJsr ? 'NIT Jamshedpur' : formData.college,
        idCardUrl: uploadData.secure_url,
        registrationDate: new Date(),
        referralCode: formData.referralCode
      };

      console.log('Sending signup data:', signupData); // Debug log

      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      console.log('Signup successful:', data); // Debug log

      // Store complete user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative 
      bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-sm relative z-10 mx-4 my-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-300">Join OJASS 2025 today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-500/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-full bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-full bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full px-4 py-3 rounded-full bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
              placeholder="Enter your 10-digit phone number"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setFormData({...formData, phone: value});
              }}
              required
            />
            <p className="mt-1 text-sm text-gray-400">
              Enter a 10-digit number without spaces or special characters
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 rounded-full bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full px-4 py-3 rounded-full bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isNitJsr"
                checked={formData.isNitJsr}
                onChange={(e) => setFormData({
                  ...formData,
                  isNitJsr: e.target.checked,
                  college: e.target.checked ? 'NIT Jamshedpur' : ''
                })}
                className="w-4 h-4 rounded border-gray-600 bg-white/10 text-white focus:ring-white"
              />
              <label htmlFor="isNitJsr" className="text-sm font-medium text-gray-300">
                I am a student of NIT Jamshedpur
              </label>
            </div>

            {!formData.isNitJsr && (
              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-300 mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  id="college"
                  className="w-full px-4 py-3 rounded-full bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter your college name"
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                  required
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="idCard" className="block text-sm font-medium text-gray-300 mb-2">
              College ID Card
            </label>
            <input
              type="file"
              id="idCard"
              accept="image/*"
              onChange={handleIdCardUpload}
              className="w-full px-4 py-3 rounded-full bg-white/10 border border-gray-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
              required
            />
            {idCardPreview && (
              <div className="mt-2 mb-4">
                <Image 
                  width={400} 
                  height={100}
                  src={idCardPreview} 
                  alt="ID Card Preview" 
                  className="w-full max-w-xs mx-auto rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="referralCode" className="block text-sm font-medium text-gray-300 mb-2">
              Referral Code (Optional)
            </label>
            <input
              type="text"
              id="referralCode"
              className="w-full px-4 py-3 rounded-full bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
              placeholder="Enter referral code if you have one"
              value={formData.referralCode}
              onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-full bg-white/15 border border-white text-white font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            onClick={() => setauthScreen('false')}
          >
            {isLoading ? <Loader /> : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 mb-2 text-center text-gray-300">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp; 