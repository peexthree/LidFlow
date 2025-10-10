'use client';

import { useEffect, useState } from 'react';

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Орб 1 - Фиолетовый */}
      <div
        className="floating-orb"
        style={{
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent)',
          animationDelay: '0s',
        }}
      />
      
      {/* Орб 2 - Розовый */}
      <div
        className="floating-orb"
        style={{
          top: '60%',
          right: '15%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(240, 147, 251, 0.3), transparent)',
          animationDelay: '2s',
        }}
      />
      
      {/* Орб 3 - Голубой */}
      <div
        className="floating-orb"
        style={{
          bottom: '10%',
          left: '30%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.35), transparent)',
          animationDelay: '4s',
        }}
      />
    </div>
  );
}

export function CursorTrail() {
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev, newTrail]);

      // Удаляем след через 800ms
      setTimeout(() => {
        setTrails((prev) => prev.filter((trail) => trail.id !== newTrail.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 10,
            top: trail.y - 10,
          }}
        />
      ))}
    </>
  );
}

export function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsRevealed(true);
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`scroll-reveal-${delay}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  return (
    <div
      id={`scroll-reveal-${delay}`}
      className={`scroll-reveal ${isRevealed ? 'revealed' : ''}`}
    >
      {children}
    </div>
  );
}
