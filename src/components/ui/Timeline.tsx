"use client";

import { useI18n } from '@/hooks/useI18n';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type TimelineItemProps = {
  metaKey: string;
  titleKey: string;
  descriptionKey: string;
};

type TimelineProps = {
  items: TimelineItemProps[];
};

export default function Timeline({ items }: TimelineProps) {
  const { t } = useI18n();
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              const dot = (entry.target as HTMLElement).querySelector('.t-dot');
              dot?.setAttribute('data-state', 'on');
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      if (observer) {
        itemRefs.current.forEach(ref => {
          if (ref) observer.unobserve(ref);
        });
        observer.disconnect();
      }
    };
  }, [items]);

  return (
    <div ref={timelineRef} className="timeline relative mt-2.5 before:content-[''] before:absolute before:left-[8px] before:top-2 before:bottom-2 before:w-0.5 before:bg-accent/30">
      {items.map((item, index) => (
        <div key={index} ref={el => itemRefs.current[index] = el} className="t-item relative my-6 pl-8">
          <div
            className={cn(
                "t-dot absolute left-0 top-1.5 w-4 h-4 rounded-full bg-transparent border-2 border-accent/40 transition-all duration-500",
                "shadow-[0_0_0_0_rgba(120,255,209,0)]",
                "data-[state=on]:bg-accent data-[state=on]:border-accent data-[state=on]:shadow-[0_0_12px_rgba(120,255,209,0.9)]"
            )}
          ></div>
          <div className="t-meta text-muted-foreground text-sm mb-1" dangerouslySetInnerHTML={{ __html: t(item.metaKey) }}></div>
          <div className="t-title font-extrabold tracking-[.02em] text-lg">{t(item.titleKey)}</div>
          <p className="mt-1 text-muted-foreground" dangerouslySetInnerHTML={{ __html: t(item.descriptionKey) }}></p>
        </div>
      ))}
    </div>
  );
}
