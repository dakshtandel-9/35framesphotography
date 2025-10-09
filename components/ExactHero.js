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
  const galleryImages = [
    '/HeroImages/001.JPG',
    '/HeroImages/002.JPG',
    '/HeroImages/003.JPG',
    '/HeroImages/004.JPG',
    '/HeroImages/005.JPG',
    '/HeroImages/006.JPG',
    '/HeroImages/007.JPG',
    '/HeroImages/008.JPG',
    '/HeroImages/009.JPG',
    '/HeroImages/0010.JPG',
    '/HeroImages/0011.JPG',
    '/HeroImages/0012.JPG',
    '/HeroImages/0013.JPG',
  ];

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

        // Pricing animation (guarded)
        if (pricingRef.current) {
          gsap.fromTo(
            pricingRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.5 }
          );
        }
        
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

        // Additional responsive animations for mobile (guarded)
        if (window.innerWidth < 768 && containerRef.current) {
          const elements = containerRef.current.querySelectorAll('.mobile-animate');
          if (elements && elements.length) {
            gsap.fromTo(
              elements,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power1.out', delay: 0.6 }
            );
          }
        }
        
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };
    
    loadAnimations();
  }, []);

  // GSAP crossfade slider for hero images
  useEffect(() => {
    const initSlider = async () => {
      try {
        const gsap = (await import('gsap')).default;
        if (!imageRef.current) return;
        const slides = imageRef.current.querySelectorAll('.hero-slide');
        if (!slides.length) return;

        gsap.set(slides, { opacity: 0 });
        gsap.set(slides[0], { opacity: 1 });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        for (let i = 1; i < slides.length; i++) {
          tl.to(slides[i - 1], { opacity: 0, duration: 1 }, '+=3');
          tl.to(slides[i], { opacity: 1, duration: 1 }, '<');
        }
        tl.to(slides[slides.length - 1], { opacity: 0, duration: 1 }, '+=3');
        tl.to(slides[0], { opacity: 1, duration: 1 }, '<');
      } catch (error) {
        console.error('Failed to initialize hero slider:', error);
      }
    };

    initSlider();
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
            <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg">
              {galleryImages.map((src, idx) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className="hero-slide absolute inset-0 object-cover"
                />
              ))}
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