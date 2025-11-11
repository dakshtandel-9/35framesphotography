'use client';

import React from 'react';
import Image from 'next/image';

const Gallery = () => {
  // Images from public/Row1, Row2, Row3, Row4
  const rowImages = [
    '/Row1/01.jpg',
    '/Row1/02.jpg',
    '/Row1/03.jpg',
    '/Row1/04.jpg',
    '/Row1/05.jpg',
    '/Row1/06.jpg',
    '/Row1/07.jpg',
    '/Row2/01.jpg',
    '/Row2/02.jpg',
    '/Row2/03.jpg',
    '/Row2/04.jpg',
    '/Row2/05.jpg',
    '/Row2/06.jpg',
    '/Row3/imgi_14_5-10.jpg',
    '/Row3/imgi_15_8-9.jpg',
    '/Row3/imgi_17_2-10.jpg',
    '/Row3/imgi_18_3-10.jpg',
    '/Row3/imgi_21_9-9.jpg',
    '/Row3/imgi_22_10-8.jpg',
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="gallery-title text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          Our Professional photoshoots
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Browse our gallery professional photoshoots
        </p>
      </div>

      {/* Responsive grid */}
      <div className="container mx-auto px-4">
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {rowImages.map((src, index) => (
            <div
              key={`img-${index}`}
              className="relative w-full overflow-hidden rounded-lg shadow-md"
              // landscape aspect box; adjust as needed
              style={{ aspectRatio: '16 / 9' }}
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                priority={index < 4}
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 768px) 50vw,
                  (max-width: 1024px) 33vw,
                  25vw
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
