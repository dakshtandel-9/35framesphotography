'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const Testimonials = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // GSAP animation for section title and subtitle
    gsap.fromTo(
      '.testimonials-title',
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out', 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Animate subtitle with slight delay
    gsap.fromTo(
      '.testimonials-subtitle',
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        delay: 0.2,
        ease: 'power3.out', 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Continuous horizontal scrolling animation for testimonials
    const totalWidth = scrollContainerRef.current.scrollWidth;
    const containerWidth = scrollContainerRef.current.offsetWidth;
    
    const scrollAnimation = gsap.to(scrollContainerRef.current, {
      x: -totalWidth / 2, // Move half the total width to create seamless loop
      duration: 40, // 40 seconds for full cycle - slower for better readability
      ease: 'none',
      repeat: -1, // Infinite repeat
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => scrollAnimation.play(),
        onLeave: () => scrollAnimation.pause(),
        onEnterBack: () => scrollAnimation.play(),
        onLeaveBack: () => scrollAnimation.pause(),
      }
    });
    
    // Animate individual testimonial cards on scroll
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );
    
    // Cleanup function
    return () => {
      scrollAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const testimonials = [
    {
      name: 'Buvana V',
      position: 'Wedding Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5,
      text: 'He is a wonderful and a very friendly photographer... All the photos are very beautiful.. He covered every important moment of the entire event... He edited all the photos so nicely.. And we had a lot of requirements on the album side and he fulfilled all our requirements very patiently... The album is really amazing and he gave it on time... we were really happy to work with him and We strongly recommend him...'
    },
    {
      name: 'Sunitha B',
      position: 'Event Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      text: 'We hired photography and videography for my son\'s first holy communion. Somu and his team are very friendly, patient and professionals. I really loved there service. Never experienced such a good service with great smiles on there faces throughout the event so patiently handling all the guests request to click. Though we were busy Somu ensured to click our family pictures. I loved the pictures, candid videos and the final highlight video. Team proved there proficiency. All the best team. For your genuine service you will reach heights soon. God bless.'
    },
    {
      name: 'Sutirtha C',
      position: 'Photography Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      rating: 5,
      text: 'The service offered by 35 frames Photography was fantastic, with the professionals explaining each and every process in detail. The final output was worth every single rupee. They were also punctual in completing the order.'
    },
    {
      name: 'Priya Sharma',
      position: 'Wedding Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
      rating: 5,
      text: 'The team captured our wedding day perfectly! Every emotion, every moment was beautifully preserved. The album they created exceeded our expectations. Highly recommend their services to anyone in Bangalore looking for professional wedding photography.'
    },
    {
      name: 'Rahul Patel',
      position: 'Corporate Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
      rating: 5,
      text: 'We hired them for our company\'s annual event photography and the results were outstanding. Professional, punctual, and delivered high-quality images that perfectly captured our brand\'s essence. Somu and his team are incredibly talented.'
    },
    {
      name: 'Anita Reddy',
      position: 'Pre-Wedding Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      rating: 5,
      text: 'Amazing pre-wedding shoot experience with 35 Frames Photography! Somu made us feel comfortable throughout the session and the photos turned out absolutely stunning. The creativity and attention to detail is remarkable.'
    },
    {
      name: 'Vikram Singh',
      position: 'Wedding Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      rating: 5,
      text: 'Outstanding service from start to finish. The team was professional, friendly, and captured every precious moment of our special day. The quality of photos and videos exceeded our expectations. Highly recommended!'
    },
    {
      name: 'Meera Krishnan',
      position: 'Family Portrait Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 5,
      text: 'Wonderful experience with 35 Frames Photography for our family portraits. Somu has an eye for detail and made sure everyone looked their best. The final photos were delivered on time and beautifully edited.'
    },
    {
      name: 'Arjun Kumar',
      position: 'Engagement Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      rating: 5,
      text: 'Fantastic engagement shoot! The team was creative, professional, and made the entire experience enjoyable. The photos captured our love story perfectly. Thank you 35 Frames Photography for the beautiful memories!'
    },
    {
      name: 'Deepika Nair',
      position: 'Wedding Client',
      location: 'Bangalore',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      rating: 5,
      text: 'Exceptional wedding photography service! Somu and his team covered every ritual and moment with such precision. The candid shots are absolutely beautiful and the traditional photography is top-notch. Worth every penny!'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="testimonials-title text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          What Our Clients Are Saying
        </h2>
        <p className="testimonials-subtitle text-center text-gray-600 mb-8">
          Real experiences from our satisfied clients across Bangalore. Trusted by 1500+ couples and families.
        </p>
      </div>
      
      {/* Horizontal scrolling container */}
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 px-4 pb-4"
          style={{ width: 'max-content' }}
        >
          {/* First set of testimonials */}
          {testimonials.map((testimonial, index) => (
            <div 
              key={`first-${index}`}
              className="testimonial-card bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-80"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={48} 
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {testimonials.map((testimonial, index) => (
            <div 
              key={`second-${index}`}
              className="testimonial-card bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-80"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={48} 
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;