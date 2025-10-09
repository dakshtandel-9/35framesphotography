'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Header = () => {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const contactButtonRef = useRef(null);
  const isHeaderOpaqueRef = useRef(false);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: element,
          offsetY: 80
        },
        ease: "power2.inOut"
      });
    }
  };

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
        gsap.registerPlugin(ScrollToPlugin);

        // Header scroll animation
        if (headerRef.current) {
          gsap.set(headerRef.current, { y: -100 });
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
          });

          // Header background change on scroll
          ScrollTrigger.create({
            trigger: "body",
            start: "top -80",
            end: "bottom bottom",
            onUpdate: (self) => {
              if (self.direction === 1 && self.progress > 0.1) {
                gsap.to(headerRef.current, {
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  duration: 0.3
                });
                isHeaderOpaqueRef.current = true;
              } else if (self.direction === -1 && self.progress < 0.1) {
                gsap.to(headerRef.current, {
                  backgroundColor: "rgba(255, 255, 255, 0)",
                  backdropFilter: "blur(0px)",
                  boxShadow: "none",
                  duration: 0.3
                });
                isHeaderOpaqueRef.current = false;
              }
            }
          });
        }

        // Logo animation
        if (logoRef.current) {
          gsap.fromTo(
            logoRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.4 }
          );
        }

        // Navigation items animation removed since nav is gone

        // Contact button animations
        if (contactButtonRef.current) {
          gsap.fromTo(
            contactButtonRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1 }
          );

          const shineEffect = document.createElement('div');
          shineEffect.className = 'shine-effect';
          shineEffect.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: left 0.5s;
            z-index: 1;
          `;
          
          contactButtonRef.current.style.position = 'relative';
          contactButtonRef.current.style.overflow = 'hidden';
          contactButtonRef.current.appendChild(shineEffect);

          contactButtonRef.current.addEventListener('mouseenter', () => {
            if (!isHeaderOpaqueRef.current) return;
            gsap.to(contactButtonRef.current, {
              scale: 1.05,
              y: -2,
              boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            shineEffect.style.left = '100%';
          });

          contactButtonRef.current.addEventListener('mouseleave', () => {
            if (!isHeaderOpaqueRef.current) return;
            gsap.to(contactButtonRef.current, {
              scale: 1,
              y: 0,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            shineEffect.style.left = '-100%';
          });
        }

        // Menu button animation removed since mobile menu is gone

        // Active section tracking removed since navigation items are not present

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
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(0px)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <Link href="#home" onClick={() => scrollToSection('home')}>
              <Image 
                src="/logo.png" 
                alt="35 Frames Photography" 
                width={520} 
                height={130} 
                className="h-14 lg:h-18 w-auto transition-transform duration-300 hover:scale-105"
                style={{ filter: 'invert(1) drop-shadow(0 1px 1.5px rgba(0,0,0,0.3))' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation removed as requested */}

          {/* Desktop Contact Button */}
          <div className="hidden lg:block">
            <button
              ref={contactButtonRef}
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden"
            >
              <span className="relative z-10">Get Quote</span>
            </button>
          </div>

          {/* Mobile menu removed as requested */}
        </div>

        {/* Mobile navigation removed */}
      </div>
    </header>
  );
};

export default Header;