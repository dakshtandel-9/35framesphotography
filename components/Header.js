'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const mobileNavItemsRef = useRef([]);
  const menuButtonRef = useRef(null);
  const contactButtonRef = useRef(null);

  const navigationItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

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
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setTimeout(() => {
        if (mobileMenuRef.current) {
          gsap.fromTo(
            mobileMenuRef.current,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
          );
          
          mobileNavItemsRef.current.forEach((item, index) => {
            if (item) {
              gsap.fromTo(
                item,
                { x: -50, opacity: 0 },
                { 
                  x: 0, 
                  opacity: 1, 
                  duration: 0.4, 
                  delay: index * 0.1, 
                  ease: 'power2.out' 
                }
              );
            }
          });
        }
      }, 10);
    } else {
      if (mobileMenuRef.current) {
        mobileNavItemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.to(item, {
              x: -50,
              opacity: 0,
              duration: 0.3,
              delay: (mobileNavItemsRef.current.length - 1 - index) * 0.05,
              ease: 'power2.in'
            });
          }
        });
        
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          delay: 0.2,
          ease: 'power3.in',
          onComplete: () => setIsMenuOpen(false)
        });
      }
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
              } else if (self.direction === -1 && self.progress < 0.1) {
                gsap.to(headerRef.current, {
                  backgroundColor: "rgba(255, 255, 255, 0)",
                  backdropFilter: "blur(0px)",
                  boxShadow: "none",
                  duration: 0.3
                });
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

        // Navigation items animation
        navItemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.fromTo(
              item,
              { y: -20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, delay: 0.6 + index * 0.1, ease: 'power2.out' }
            );

            // Hover animations
            item.addEventListener('mouseenter', () => {
              gsap.to(item, {
                y: -2,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
              });
            });

            item.addEventListener('mouseleave', () => {
              gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
              });
            });
          }
        });

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

        // Menu button animation
        if (menuButtonRef.current) {
          gsap.fromTo(
            menuButtonRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1 }
          );

          menuButtonRef.current.addEventListener('mouseenter', () => {
            gsap.to(menuButtonRef.current, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          menuButtonRef.current.addEventListener('mouseleave', () => {
            gsap.to(menuButtonRef.current, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        }

        // Active section tracking
        const sections = navigationItems.map(item => item.id);
        sections.forEach(sectionId => {
          ScrollTrigger.create({
            trigger: `#${sectionId}`,
            start: "top 100px",
            end: "bottom 100px",
            onEnter: () => setActiveSection(sectionId),
            onEnterBack: () => setActiveSection(sectionId)
          });
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
                src="https://35framesphotography.com/wp-content/uploads/2023/06/imgi_2_35-frames-w-1.png" 
                alt="35 Frames Photography" 
                width={520} 
                height={130} 
                className="h-14 lg:h-18 w-auto transition-transform duration-300 hover:scale-105"
                style={{ filter: 'invert(1) drop-shadow(0 1px 1.5px rgba(0,0,0,0.3))' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                ref={el => navItemsRef.current[index] = el}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

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

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={el => mobileNavItemsRef.current[index] = el}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    activeSection === item.id 
                      ? 'text-amber-600 bg-amber-50' 
                      : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                  } rounded-md`}
                  style={{ opacity: 0, transform: 'translateX(-50px)' }}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300"
              >
                Get Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;