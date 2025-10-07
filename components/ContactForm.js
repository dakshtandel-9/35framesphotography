'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ContactForm = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const submitButtonRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Typing animation for title
      const titleText = "Let's Create Something Amazing Together";
      const subtitleText = "Ready to capture your perfect moments? Get in touch with us today and let's discuss your photography needs.";
      
      // Clear initial text
      titleRef.current.textContent = '';
      subtitleRef.current.textContent = '';

      // Title typing animation
      const titleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      titleTimeline.to({}, {
        duration: titleText.length * 0.05,
        ease: 'none',
        onUpdate: function() {
          const progress = this.progress();
          const currentLength = Math.floor(progress * titleText.length);
          titleRef.current.textContent = titleText.substring(0, currentLength);
        }
      });

      // Subtitle typing animation (starts after title)
      titleTimeline.to({}, {
        duration: subtitleText.length * 0.03,
        ease: 'none',
        onUpdate: function() {
          const progress = this.progress();
          const currentLength = Math.floor(progress * subtitleText.length);
          subtitleRef.current.textContent = subtitleText.substring(0, currentLength);
        }
      }, "+=0.5");

      // Form fields animation
      gsap.fromTo(
        '.form-field',
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          }
        }
      );

      // Submit button special animation
      gsap.fromTo(
        '.submit-btn',
        { 
          opacity: 0, 
          scale: 0.8,
          rotationY: 180
        },
        { 
          opacity: 1, 
          scale: 1,
          rotationY: 0,
          duration: 1, 
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'bottom 90%',
          }
        }
      );

      // Advanced submit button hover animations
      if (submitButtonRef.current) {
        // Create gradient background elements
        const gradientBg = document.createElement('div');
        gradientBg.className = 'gradient-bg';
        gradientBg.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
          background-size: 400% 400%;
          border-radius: inherit;
          opacity: 0;
          z-index: -1;
        `;
        
        submitButtonRef.current.style.position = 'relative';
        submitButtonRef.current.style.overflow = 'hidden';
        submitButtonRef.current.appendChild(gradientBg);

        // Hover animations
        submitButtonRef.current.addEventListener('mouseenter', () => {
          gsap.to(submitButtonRef.current, {
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          gsap.to(gradientBg, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          gsap.to(gradientBg, {
            backgroundPosition: '100% 100%',
            duration: 2,
            ease: 'none',
            repeat: -1,
            yoyo: true
          });
        });

        submitButtonRef.current.addEventListener('mouseleave', () => {
          gsap.to(submitButtonRef.current, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          gsap.to(gradientBg, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        // Click animation
        submitButtonRef.current.addEventListener('click', () => {
          gsap.to(submitButtonRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Loading animation
    gsap.to(submitButtonRef.current, {
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.out'
    });
    
    // Simulate form submission
    try {
      console.log('Form submitted:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success animation sequence
      gsap.timeline()
        .to(submitButtonRef.current, {
          scale: 1.1,
          backgroundColor: '#10b981',
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
        .to(submitButtonRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        })
        .to(submitButtonRef.current, {
          backgroundColor: '#3b82f6',
          duration: 0.5,
          delay: 1,
          ease: 'power2.out'
        });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      }, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Error animation
      gsap.to(submitButtonRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: 'power2.out'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h2 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight min-h-[120px]"
              >
                {/* Text will be populated by GSAP typing animation */}
              </h2>
              <p 
                ref={subtitleRef}
                className="text-lg text-gray-600 leading-relaxed min-h-[80px]"
              >
                {/* Text will be populated by GSAP typing animation */}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="form-field flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.928c-.732.732-.732 1.919 0 2.651l.106.106c.732.732 1.919.732 2.651 0L12.072 10.84a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V16a2 2 0 01-2 2h-1C9.716 18 2 10.284 2 4V3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 98450 12345</p>
                </div>
              </div>

              <div className="form-field flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@35framesphotography.com</p>
                </div>
              </div>

              <div className="form-field flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="form-field">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-field">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Interested In *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a service</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="pre-wedding">Pre-Wedding Shoots</option>
                  <option value="engagement">Engagement Photography</option>
                  <option value="event">Event Photography</option>
                  <option value="portrait">Portrait Sessions</option>
                  <option value="cinematography">Cinematography</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your photography needs..."
                />
              </div>

              <button
                ref={submitButtonRef}
                type="submit"
                disabled={isSubmitting}
                className="submit-btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;