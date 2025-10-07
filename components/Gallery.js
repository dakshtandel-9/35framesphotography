'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const Gallery = () => {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // GSAP animation for section title
    gsap.fromTo(
      '.gallery-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }}
    );
    
    // Horizontal scroll animations for rows
    const row1Animation = gsap.to(row1Ref.current, {
      x: '-50%',
      ease: 'none',
      scrollTrigger: {
        trigger: row1Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
    
    const row2Animation = gsap.to(row2Ref.current, {
      x: '50%',
      ease: 'none',
      scrollTrigger: {
        trigger: row2Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
    
    // Cleanup function
    return () => {
      row1Animation.kill();
      row2Animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Sample gallery images (AI-generated headshots)
  const row1Images = [
    {
      src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a businessman'
    },
    {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a businesswoman'
    },
    {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a young man'
    },
    {
      src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a young woman'
    },
    {
      src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a man in suit'
    },
    {
      src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a woman in business attire'
    }
  ];

  const row2Images = [
    {
      src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a woman with glasses'
    },
    {
      src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a young man smiling'
    },
    {
      src: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a woman with long hair'
    },
    {
      src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a man with glasses'
    },
    {
      src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a woman smiling'
    },
    {
      src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional headshot of a woman with short hair'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="gallery-title text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          Our Professional Headshots
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Browse our gallery of AI-generated professional headshots
        </p>
      </div>
      
      {/* First row - scrolls left */}
      <div className="relative mb-8 py-4">
        <div 
          ref={row1Ref} 
          className="flex space-x-6 w-[200%]"
          style={{ transform: 'translateX(0%)' }}
        >
          {row1Images.concat(row1Images).map((image, index) => (
            <div key={index} className="relative w-72 h-80 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1">
                AI GENERATED
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Second row - scrolls right */}
      <div className="relative py-4">
        <div 
          ref={row2Ref} 
          className="flex space-x-6 w-[200%]"
          style={{ transform: 'translateX(-50%)' }}
        >
          {row2Images.concat(row2Images).map((image, index) => (
            <div key={index} className="relative w-72 h-80 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1">
                AI GENERATED
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;