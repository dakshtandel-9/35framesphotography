'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

const LoadingAnimation = ({ onComplete }) => {
  useEffect(() => {
    // Simple timeout to complete loading after 1.5 seconds
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center space-y-6">
        {/* Logo */}
        <Image 
          src="/logo.png" 
          alt="35 Frames Photography" 
          width={200} 
          height={50} 
          className="h-12 w-auto filter brightness-0 invert"
        />

        {/* Simple Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-white text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;