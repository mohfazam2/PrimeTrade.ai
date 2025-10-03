"use client"

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://prime-trade-ai-server.vercel.app/api/v1/auth/login", formData);
      
     
      localStorage.setItem('token', response.data.token);
      
      console.log('Login submitted:', formData);
      console.log('Response:', response.data);
      
      
      router.push("/Dashboard");
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
        <div className="p-6 space-y-1 pb-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Welcome Back
          </h2>
          <p className="text-zinc-400 text-center text-sm">
            Enter your credentials to access your account
          </p>
        </div>
        
        <div className="px-6 pb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-zinc-200 text-sm font-medium block">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg h-11 px-3 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-zinc-200 text-sm font-medium block">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg h-11 px-3 outline-none transition-all"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mt-6"
            >
              Login
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-zinc-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/')}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}