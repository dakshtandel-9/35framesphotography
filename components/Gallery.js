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

  // Use local public/gallaryImage images and split half per row
  const allImages = [
    { src: '/gallaryImage/G1.jpg', alt: 'Gallery image 1' },
    { src: '/gallaryImage/G2.jpg', alt: 'Gallery image 2' },
    { src: '/gallaryImage/G3.webp', alt: 'Gallery image 3' },
    { src: '/gallaryImage/G4.jpg', alt: 'Gallery image 4' },
    { src: '/gallaryImage/G5.jpg', alt: 'Gallery image 5' },
    { src: '/gallaryImage/G6.jpg', alt: 'Gallery image 6' },
    { src: '/gallaryImage/G7.jpg', alt: 'Gallery image 7' },
    { src: '/gallaryImage/G8.jpg', alt: 'Gallery image 8' },
    { src: '/gallaryImage/G9.jpg', alt: 'Gallery image 9' },
    { src: '/gallaryImage/G10.jpg', alt: 'Gallery image 10' },
    { src: '/gallaryImage/G11.jpg', alt: 'Gallery image 11' },
    { src: '/gallaryImage/G12.jpg', alt: 'Gallery image 12' },
    { src: '/gallaryImage/G13.jpg', alt: 'Gallery image 13' },
    { src: '/gallaryImage/G14.jpg', alt: 'Gallery image 14' },
    { src: '/gallaryImage/G15.jpg', alt: 'Gallery image 15' },
    { src: '/gallaryImage/G16.jpg', alt: 'Gallery image 16' },
    { src: '/gallaryImage/G17.jpg', alt: 'Gallery image 17' },
    { src: '/gallaryImage/G18.jpg', alt: 'Gallery image 18' },
    { src: '/gallaryImage/G19.jpg', alt: 'Gallery image 19' },
    { src: '/gallaryImage/G20.jpg', alt: 'Gallery image 20' },
    { src: '/gallaryImage/G21.jpg', alt: 'Gallery image 21' },
    { src: '/gallaryImage/G22.jpg', alt: 'Gallery image 22' },
    { src: '/gallaryImage/G23.jpg', alt: 'Gallery image 23' },
    { src: '/gallaryImage/G24.jpg', alt: 'Gallery image 24' },
  ];
  const midpoint = Math.ceil(allImages.length / 2);
  const row1Images = allImages.slice(0, midpoint);
  const row2Images = allImages.slice(midpoint);

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
          className="flex space-x-6 w-max"
          style={{ transform: 'translateX(0%)' }}
        >
          {row1Images.map((image, index) => (
            <div key={index} className="relative w-72 h-80 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Second row - scrolls right */}
      <div className="relative py-4">
        <div 
          ref={row2Ref} 
          className="flex space-x-6 w-max"
          style={{ transform: 'translateX(-50%)' }}
        >
          {row2Images.map((image, index) => (
            <div key={index} className="relative w-72 h-80 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;