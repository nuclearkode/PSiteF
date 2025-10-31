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
  const [isVisible, setIsVisible] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (observer && timelineRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      itemRefs.current.forEach((ref, index) => {
        setTimeout(() => {
          ref?.classList.add('on');
        }, index * 420);
      });
    }
  }, [isVisible]);

  return (
    <div ref={timelineRef} className="timeline relative mt-2.5 before:content-[''] before:absolute before:left-[22px] before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-transparent before:rounded-lg before:opacity-70">
      {items.map((item, index) => (
        <div key={index} className="t-item relative my-4 pl-14">
          <div
            ref={el => itemRefs.current[index] = el}
            className={cn(
                "t-dot absolute left-[14px] top-2 w-4 h-4 rounded-full bg-[#262b36] border-2 border-accent opacity-70 transition-all duration-900",
                "shadow-[0_0_0_0_rgba(120,255,209,0)]",
                "data-[state=on]:bg-accent data-[state=on]:shadow-[0_0_12px_rgba(120,255,209,0.9)]"
            )}
          ></div>
          <div className="t-meta text-muted-foreground text-sm mb-1" dangerouslySetInnerHTML={{ __html: t(item.metaKey) }}></div>
          <div className="t-title font-extrabold tracking-[.02em]">{t(item.titleKey)}</div>
          <p className="mt-1" dangerouslySetInnerHTML={{ __html: t(item.descriptionKey) }}></p>
        </div>
      ))}
    </div>
  );
}
