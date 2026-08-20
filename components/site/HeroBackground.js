'use client';

import { useEffect, useState } from 'react';

// Full-bleed hero background with a slow "Ken Burns" zoom/pan effect.
// If multiple slides are provided, they crossfade automatically every 6s.
export default function HeroBackground({ slides }) {
  const images = (slides || []).filter((s) => s?.image).map((s) => s.image);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(id);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src + i}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center animate-hero-kenburns"
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      ))}
    </div>
  );
}
