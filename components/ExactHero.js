'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ExactHero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const pricingRef = useRef(null);
  const containerRef = useRef(null);
  const ctaButtonRef = useRef(null);

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        // Dynamic import of GSAP
        const gsap = (await import('gsap')).default;
        
        // Hero section animation
        gsap.fromTo(
          textRef.current.querySelectorAll('h1, h2, p, .blue-badge'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
        
        // Stats animation
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-item'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.3 }
        );
        
        // Image animation
        gsap.fromTo(
          imageRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
        );

        // Pricing animation
        gsap.fromTo(
          pricingRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.5 }
        );
        
        // CTA Button advanced animations
        if (ctaButtonRef.current) {
          // Initial animation
          gsap.fromTo(
            ctaButtonRef.current,
            { scale: 0.8, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)', delay: 0.8 }
          );

          // Create pulse effect element
          const pulseEffect = document.createElement('div');
          pulseEffect.className = 'pulse-effect';
          pulseEffect.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: rgba(245, 158, 11, 0.3);
            border-radius: inherit;
            transform: translate(-50%, -50%);
            z-index: -1;
            opacity: 0;
          `;
          
          ctaButtonRef.current.style.position = 'relative';
          ctaButtonRef.current.appendChild(pulseEffect);

          // Hover animations
          ctaButtonRef.current.addEventListener('mouseenter', () => {
            gsap.to(ctaButtonRef.current, {
              scale: 1.05,
              y: -3,
              boxShadow: '0 15px 30px rgba(245, 158, 11, 0.4)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Pulse effect
            gsap.to(pulseEffect, {
              scale: 1.2,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          ctaButtonRef.current.addEventListener('mouseleave', () => {
            gsap.to(ctaButtonRef.current, {
              scale: 1,
              y: 0,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            gsap.to(pulseEffect, {
              scale: 1,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          // Click animation
          ctaButtonRef.current.addEventListener('click', () => {
            gsap.to(ctaButtonRef.current, {
              scale: 0.95,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut'
            });
          });

          // Periodic attention animation
          gsap.to(ctaButtonRef.current, {
            scale: 1.02,
            duration: 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
            delay: 3
          });
        }

        // Additional responsive animations for mobile
        if (window.innerWidth < 768) {
          gsap.fromTo(
            containerRef.current.querySelectorAll('.mobile-animate'),
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power1.out', delay: 0.6 }
          );
        }
        
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };
    
    loadAnimations();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="pt-16 pb-6 sm:pt-20 sm:pb-8 md:pt-24 md:pb-12 lg:pt-28 lg:pb-16 bg-[#f8fafc] overflow-hidden"
    >
      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 sm:gap-8 md:gap-12">
          {/* Left Column - Text Content */}
          <div 
            ref={textRef}
            className="w-full lg:w-[45%] max-w-2xl order-1 lg:order-1"
          >
            <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 blue-badge">
              35 Frames Photography - Bangalore
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
              Turning <span className="text-amber-500">Moments</span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500 mb-1 sm:mb-2 leading-tight">
              Into Masterpieces
            </h2>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Frame by Frame
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl">
              Your Story, Beautifully Captured & Perfectly Designed. At 35 Frames Photography, we offer you a sweet ride to your Wedding Day with professional photography and videography services in Bangalore.
            </p>
            
            {/* Stats Section */}
            <div 
              ref={statsRef}
              className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8"
            >
              <div className="stat-item bg-white p-2 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-500">21+</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Years Experience</p>
              </div>
              
              <div className="stat-item bg-white p-2 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500">1500+</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Weddings Covered</p>
              </div>
              
              <div className="stat-item bg-white p-2 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-500">5.0/5</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Client Rating</p>
              </div>
            </div>

            
            {/* Desktop CTA - Hidden on mobile */}
            <div className="hidden sm:block mt-8">
              <Link 
                ref={ctaButtonRef}
                href="/contact" 
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full transition-all shadow-md inline-block"
              >
                Book a Photography Session
              </Link>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div 
            ref={imageRef}
            className="w-full lg:w-[55%] relative order-2 lg:order-2 mb-6 lg:mb-0"
          >
            <div className="relative">
              {/* Small photo thumbnails at top */}
              <div className="absolute -top-4 sm:-top-8 right-0 md:right-20 z-20 hidden sm:block">
                <div className="flex items-center gap-1">
                  <div className="text-xs sm:text-sm font-medium bg-white p-1 rounded shadow-sm text-gray-700">
                    Our Photography Styles
                  </div>
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Wedding" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Portrait" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Family" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Product" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Event" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white object-cover" />
                  </div>
                </div>
              </div>
              
              {/* Main photography cards */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-8 md:mt-16">
                {/* Wedding photography card */}
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform rotate-2 w-full max-w-[280px] sm:max-w-none sm:w-64">
                  <div className="absolute top-1 right-1 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    Wedding
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="Wedding photography" 
                    className="w-full h-48 sm:h-64 md:h-80 object-cover"
                  />
                </div>
                
                {/* Portrait photography card */}
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform -rotate-2 w-full max-w-[280px] sm:max-w-none sm:w-64 mt-3 sm:mt-8">
                  <div className="absolute top-1 right-1 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    Portrait
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80" 
                    alt="Portrait photography" 
                    className="w-full h-48 sm:h-64 md:h-80 object-cover"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="text-white text-shadow">
                      <p className="font-bold text-xs sm:text-sm">Portrait Sessions</p>
                      <p className="text-[10px] sm:text-xs">Professional studio portraits</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonials - Responsive version */}
              <div className="mt-6 sm:mt-8 relative">
                {/* Mobile testimonial - Only visible on small screens */}
                <div className="block sm:hidden bg-white rounded-lg shadow-md p-3 max-w-xs mx-auto">
                  <div className="flex items-center gap-2 mb-1">
                    <img 
                      src="https://randomuser.me/api/portraits/women/32.jpg" 
                      alt="Priya Sharma" 
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-xs text-gray-700">Priya Sharma</p>
                      <p className="text-[10px] text-gray-600">Wedding Client, Bangalore</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-1">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p className="text-[10px] text-gray-700">
                    The team captured our wedding day perfectly! Every emotion, every moment was beautifully preserved.
                  </p>
                </div>
                
                {/* Desktop testimonials */}
                {/* Testimonial 1 */}
                <div className="absolute -bottom-16 -left-4 bg-white rounded-lg shadow-md p-3 max-w-xs transform -rotate-3 z-30 hidden md:block">
                  <div className="flex items-center gap-2 mb-1">
                    <img 
                      src="https://randomuser.me/api/portraits/women/32.jpg" 
                      alt="Priya Sharma" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-sm text-gray-700">Priya Sharma</p>
                      <p className="text-xs text-gray-600">Wedding Client, Bangalore</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-1">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p className="text-xs text-gray-700">
                    The team captured our wedding day perfectly! Every emotion, every moment was beautifully preserved. The album they created exceeded our expectations. Highly recommend their services to anyone in Bangalore.
                  </p>
                </div>
                
                {/* Testimonial 2 */}
                <div className="absolute -bottom-8 right-4 bg-white rounded-lg shadow-md p-3 max-w-xs transform rotate-2 z-20 hidden md:block">
                  <div className="flex items-center gap-2 mb-1">
                    <img 
                      src="https://randomuser.me/api/portraits/men/45.jpg" 
                      alt="Rahul Patel" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-sm text-gray-700">Rahul Patel</p>
                      <p className="text-xs text-gray-600">Corporate Client, Bangalore</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-1">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p className="text-xs text-gray-700">
                    {"We hired them for our company's annual event photography and the results were outstanding. Professional, punctual, and delivered high-quality images that perfectly captured our brand's essence."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Satisfaction guarantee - Responsive version */}
        <div className="max-w-2xl mx-auto mt-6 sm:mt-8 bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
          <div className="bg-amber-500 text-white p-1 rounded-full flex-shrink-0">
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <p className="font-bold text-xs sm:text-sm text-amber-800 mb-1">100% Satisfaction Guarantee</p>
            <p className="text-[10px] sm:text-sm text-amber-700">
              {"We're committed to your complete satisfaction. If you're not happy with your photos, we'll reshoot at no additional cost. Contact us at info@bangalorephotostudio.com"}
            </p>
          </div>
        </div>
        
        {/* Mobile CTA button below satisfaction guarantee */}
        <div className="flex justify-center mt-6 mb-8 sm:hidden">
          <Link href="/contact" className="mobile-animate bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full transition-all shadow-md">
            Book a Photography Session
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExactHero;