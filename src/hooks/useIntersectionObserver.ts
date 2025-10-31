// src/hooks/useIntersectionObserver.ts
'use client';

import { useState, useEffect, RefObject } from 'react';

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverInit
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(element); // Stop observing once it's visible
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, options]);

  return isIntersecting;
}
