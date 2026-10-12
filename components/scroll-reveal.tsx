'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const revealTargets = [
  '.service-strip',
  '.department-rail-section',
  '.baby-space-banner',
  '.baby-space-heading',
  '.baby-space .product-card',
  '.storefront #categories',
  '.storefront #featured .section-heading',
  '.storefront #featured .product-card',
  '.storefront .editorial',
  '.storefront .newsletter',
  '.category-hero',
  '.category-page .section-heading',
  '.category-page .product-card',
  '.signex-intro',
  '.signex-project-band',
  '.signex-identity',
  '.signex-documents',
  '.signex-outro',
].join(',');

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll<HTMLElement>(revealTargets);
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    targets.forEach((target) => {
      target.dataset.reveal = 'true';
      observer.observe(target);
    });
    document.documentElement.classList.add('motion-ready');

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
