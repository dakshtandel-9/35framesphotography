'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const CTAOffer = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const run = async () => {
      try {
        const gsap = (await import('gsap')).default;
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%'
              }
            }
          );

          const tag = contentRef.current.querySelector('.offer-tag');
          if (tag) {
            gsap.to(tag, {
              scale: 1.05,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
              delay: 1.2
            });
          }
        }
      } catch (e) {
        console.error('CTAOffer animation error:', e);
      }
    };
    run();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 bg-gradient-to-br from-amber-50 via-white to-amber-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div
          ref={contentRef}
          className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500"
        >
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <div className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent w-full h-full" />
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6 sm:p-8">
            <div className="text-white max-w-2xl">
              <div className="offer-tag inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
                Limited Time Offer
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Get 10% Off on All Photography Packages
              </h3>
              <p className="mt-2 text-sm sm:text-base text-white/90">
                Book now to lock in your discount for weddings, events, portraits, and more.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="https://wa.me/919900491382?text=Hi%21%20I%20want%20to%20claim%2010%25%20off%20on%20photography%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-amber-600 hover:bg-amber-50 font-semibold py-3 px-6 rounded-full shadow-md transition-colors"
              >
                Claim 10% Off
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAOffer;