'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const LoadingAnimation = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const squareRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const timeline = gsap.timeline({
      onComplete: () => {
        // Call the onComplete callback after animation finishes
        if (onComplete) {
          setTimeout(onComplete, 300);
        }
      }
    });

    // Initial setup - hide everything
    gsap.set([logoRef.current, textRef.current, progressRef.current], { 
      opacity: 0, 
      scale: 0.8 
    });
    
    gsap.set(squareRef.current, { 
      scale: 0,
      rotation: 45,
      transformOrigin: "center center"
    });

    // Progress animation
    const progressAnimation = gsap.to({}, {
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function() {
        const currentProgress = Math.floor(this.progress() * 100);
        setProgress(currentProgress);
      }
    });

    // Animation sequence
    timeline
      // Phase 1: Logo and text appear
      .to([logoRef.current, textRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.2
      })
      
      // Phase 2: Progress bar appears
      .to(progressRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")
      
      // Phase 3: Wait for progress to complete
      .to({}, { duration: 2.5 })
      
      // Phase 4: Square starts expanding
      .to(squareRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "power3.inOut"
      })
      
      // Phase 5: Square expands to cover screen
      .to(squareRef.current, {
        scale: 20,
        duration: 1.2,
        ease: "power4.inOut"
      })
      
      // Phase 6: Fade out overlay
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, "-=0.3");

    return () => {
      timeline.kill();
      progressAnimation.kill();
    };
  }, [onComplete, isClient]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        
        {/* Logo */}
        <div ref={logoRef} className="flex items-center justify-center">
          <Image 
            src="https://35framesphotography.com/wp-content/uploads/2023/06/imgi_2_35-frames-w-1.png" 
            alt="35 Frames Photography" 
            width={200} 
            height={50} 
            className="h-12 w-auto filter brightness-0 invert"
          />
        </div>

        {/* Loading Text */}
        <div ref={textRef} className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Capturing Your Moments
          </h2>
          <p className="text-gray-300 text-lg">
            Loading your photography experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div ref={progressRef} className="w-64 md:w-80">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Loading</span>
            <span className="text-sm text-white font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Expanding Square */}
      <div
        ref={squareRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div 
          className="w-32 h-32 bg-white shadow-2xl"
          style={{
            background: 'white',
            boxShadow: '0 0 100px rgba(255, 255, 255, 0.3), inset 0 0 50px rgba(255, 255, 255, 0.1)'
          }}
        />
      </div>

      {/* Particle Effects - Client Side Only */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, index) => {
            // Use deterministic values based on index to avoid hydration mismatch
            const seed = index * 0.1;
            const left = ((index * 17) % 100);
            const top = ((index * 23) % 100);
            const duration = 3 + (index % 4);
            const delay = (index % 20) * 0.1;
            
            return (
              <div
                key={index}
                className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-60"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `float ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`
                }}
              />
            );
          })}
        </div>
      )}

      {/* CSS for particle animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;