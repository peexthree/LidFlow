'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';

interface PrefetchLinkProps extends React.ComponentProps<typeof Link> {
  delay?: number;
}

export function PrefetchLink({ href, delay = 500, children, ...props }: PrefetchLinkProps) {
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [hasPrefetched, setHasPrefetched] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hasPrefetched) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Intent prefetching: prefetch only when user stops scrolling on it
            hoverTimeoutRef.current = setTimeout(() => {
              router.prefetch(href.toString() as Route);
              setHasPrefetched(true);
              observer.disconnect();
            }, delay + 1000); // add extra time for intersection to ensure they actually stopped
          } else {
             if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
             }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (linkRef.current) {
      observer.observe(linkRef.current);
    }

    return () => {
      observer.disconnect();
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [href, router, delay, hasPrefetched]);

  const handleMouseEnter = () => {
    if (hasPrefetched) return;
    hoverTimeoutRef.current = setTimeout(() => {
      router.prefetch(href.toString() as Route);
      setHasPrefetched(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current && !hasPrefetched) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Link>
  );
}
