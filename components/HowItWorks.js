'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef([]);
  const arrowsRef = useRef([]);

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        // Section entrance animation
        if (sectionRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.fromTo(
                sectionRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
              );
            }
          });
        }

        // Title animation
        if (titleRef.current) {
          ScrollTrigger.create({
            trigger: titleRef.current,
            start: "top 85%",
            onEnter: () => {
              gsap.fromTo(
                titleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
              );
            }
          });
        }

        // Steps animation
        stepsRef.current.forEach((step, index) => {
          if (step) {
            ScrollTrigger.create({
              trigger: step,
              start: "top 85%",
              onEnter: () => {
                gsap.fromTo(
                  step,
                  { y: 50, opacity: 0, scale: 0.9 },
                  { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.2, 
                    ease: 'back.out(1.7)' 
                  }
                );
              }
            });
          }
        });

        // Arrows animation
        arrowsRef.current.forEach((arrow, index) => {
          if (arrow) {
            ScrollTrigger.create({
              trigger: arrow,
              start: "top 90%",
              onEnter: () => {
                gsap.fromTo(
                  arrow,
                  { x: -20, opacity: 0 },
                  { 
                    x: 0, 
                    opacity: 1, 
                    duration: 0.5, 
                    delay: 0.8 + index * 0.2, 
                    ease: 'power2.out' 
                  }
                );
              }
            });

            // Continuous arrow animation
            gsap.to(arrow, {
              x: 10,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: 'power2.inOut',
              delay: 1.5 + index * 0.2
            });
          }
        });

      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    loadAnimations();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-gray-50" style={{ opacity: 0 }}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12" style={{ opacity: 0 }}>
          Our Photography Services
        </h2>
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div ref={el => stepsRef.current[0] = el} className="flex flex-col items-center text-center md:w-1/3 md:px-4" style={{ opacity: 0 }}>
            <div className="bg-blue-100 p-5 rounded-full mb-4">
              <svg className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Wedding Photography</h3>
            <p className="text-gray-600">
              Complete wedding coverage including traditional photography, candid shots, cinematography, and drone footage. We capture every ritual and emotion of your special day.
            </p>
          </div>
          
          {/* Arrow for desktop */}
          <div ref={el => arrowsRef.current[0] = el} className="hidden md:flex items-center justify-center md:mt-16" style={{ opacity: 0 }}>
            <svg className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          
          {/* Step 2 */}
          <div ref={el => stepsRef.current[1] = el} className="flex flex-col items-center text-center md:w-1/3 md:px-4" style={{ opacity: 0 }}>
            <div className="bg-amber-100 p-5 rounded-full mb-4">
              <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pre-Wedding & Engagement</h3>
            <p className="text-gray-600">
              Beautiful pre-wedding shoots and engagement photography sessions. Complimentary sessions included with wedding packages in Bangalore.
            </p>
          </div>
          
          {/* Arrow for desktop */}
          <div ref={el => arrowsRef.current[1] = el} className="hidden md:flex items-center justify-center md:mt-16" style={{ opacity: 0 }}>
            <svg className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          
          {/* Step 3 */}
          <div ref={el => stepsRef.current[2] = el} className="flex flex-col items-center text-center md:w-1/3 md:px-4" style={{ opacity: 0 }}>
            <div className="bg-green-100 p-5 rounded-full mb-4">
              <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Events & Portraits</h3>
            <p className="text-gray-600">
              Corporate events, family portraits, maternity shoots, and fashion photography. Professional service for all your photography needs.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            With 21+ years of experience and 1500+ weddings covered, we provide comprehensive photography and videography services across Bangalore. From traditional to candid, we capture your story beautifully.
          </p>
          <a href="/contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full transition-all shadow-md">
            Book Your Photography Session
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;