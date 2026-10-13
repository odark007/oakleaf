"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/images/cert-trainer-1.jpg", alt: "Certified Trainer Workshop" },
  { src: "/images/cert-trainer-2.jpg", alt: "Certified Trainer Workshop" },
  { src: "/images/cert-trainer-3.jpg", alt: "Certified Trainer Workshop" },
];

export function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-oak-line shadow-sm">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative min-w-full">
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={400}
              className="h-[240px] w-full object-cover md:h-[320px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
