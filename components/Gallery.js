'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const Gallery = () => {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);

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
    
    const row3Animation = gsap.to(row3Ref.current, {
      x: '-40%',
      ease: 'none',
      scrollTrigger: {
        trigger: row3Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
    
    const row4Animation = gsap.to(row4Ref.current, {
      x: '40%',
      ease: 'none',
      scrollTrigger: {
        trigger: row4Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
    
    // Cleanup function
    return () => {
      row1Animation.kill();
      row2Animation.kill();
      row3Animation.kill();
      row4Animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Use images from public/Row1, Row2, Row3 (landscape)
  const row1Images = [
    '/Row1/01.jpg',
    '/Row1/02.jpg',
    '/Row1/03.jpg',
    '/Row1/04.jpg',
    '/Row1/05.jpg',
    '/Row1/06.jpg',
    '/Row1/07.jpg',
    '/Row1/01.jpg',
    '/Row1/02.jpg',
    '/Row1/03.jpg',
    '/Row1/04.jpg',
    '/Row1/05.jpg',
    '/Row1/06.jpg',
    '/Row1/07.jpg',
  ];
  const row2Images = [
    '/Row2/01.jpg',
    '/Row2/02.jpg',
    '/Row2/03.jpg',
    '/Row2/04.jpg',
    '/Row2/05.jpg',
    '/Row2/06.jpg',
     '/Row2/01.jpg',
    '/Row2/02.jpg',
    '/Row2/03.jpg',
    '/Row2/04.jpg',
    '/Row2/05.jpg',
    '/Row2/06.jpg',
  ];
  const row3Images = [
    '/Row3/imgi_14_5-10.jpg',
    '/Row3/imgi_15_8-9.jpg',
    '/Row3/imgi_17_2-10.jpg',
    '/Row3/imgi_18_3-10.jpg',
    '/Row3/imgi_21_9-9.jpg',
    '/Row3/imgi_22_10-8.jpg',
    '/Row3/imgi_14_5-10.jpg',
    '/Row3/imgi_15_8-9.jpg',
    '/Row3/imgi_17_2-10.jpg',
    '/Row3/imgi_18_3-10.jpg',
    '/Row3/imgi_21_9-9.jpg',
    '/Row3/imgi_22_10-8.jpg',
  ];
  const row4Images = [
    '/Row4/imgi_10_35F03378-scaled.jpg',
    '/Row4/imgi_11_35F03314-scaled.jpg',
    '/Row4/imgi_12_35F03284-scaled.jpg',
    '/Row4/imgi_13_35F03397-scaled.jpg',
    '/Row4/imgi_14_35F03534-1-scaled.jpg',
    '/Row4/imgi_15_35F03594-scaled.jpg',
    '/Row4/imgi_30_35F03696-scaled.jpg',
    '/Row4/imgi_4_35F03663-scaled.jpg',
    '/Row4/imgi_8_35F03199-scaled.jpg',
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="gallery-title text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          Our Professional photoshoots
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Browse our gallery professional photoshoots
        </p>
      </div>
      
      {/* First row - scrolls left */}
      <div className="relative mb-8 py-4">
        <div 
          ref={row1Ref} 
          className="flex space-x-6 w-max"
          style={{ transform: 'translateX(0%)' }}
        >
          {row1Images.map((src, index) => (
            <div key={`r1-${index}`} className="relative w-72 aspect-video flex-shrink-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`Row 1 image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
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
          {row2Images.map((src, index) => (
            <div key={`r2-${index}`} className="relative w-72 aspect-video flex-shrink-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`Row 2 image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Third row - scrolls left */}
      <div className="relative py-4">
        <div 
          ref={row3Ref} 
          className="flex space-x-6 w-max"
          style={{ transform: 'translateX(0%)' }}
        >
          {row3Images.map((src, index) => (
            <div key={`r3-${index}`} className="relative w-72 aspect-video flex-shrink-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`Row 3 image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fourth row - scrolls right */}
      <div className="relative py-4">
        <div 
          ref={row4Ref} 
          className="flex space-x-6 w-max"
          style={{ transform: 'translateX(-40%)' }}
        >
          {row4Images.map((src, index) => (
            <div key={`r4-${index}`} className="relative w-72 aspect-video flex-shrink-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`Row 4 image ${index + 1}`}
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