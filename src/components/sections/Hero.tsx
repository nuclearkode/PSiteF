'use client';
import { useI18n } from '@/hooks/useI18n';

const HumanoidRobotIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M50 25C47.2386 25 45 27.2386 45 30V40H55V30C55 27.2386 52.7614 25 50 25Z" fill="currentColor" opacity="0.8"/>
        <path d="M50 15C55.5228 15 60 19.4772 60 25V27H40V25C40 19.4772 44.4772 15 50 15Z" fill="currentColor"/>
        <path d="M35 45H65V65H35V45Z" fill="currentColor" opacity="0.6"/>
        <path d="M40 65H60V85H55V75H45V85H40V65Z" fill="currentColor"/>
        <path d="M30 42H35V70H30V42Z" fill="currentColor" opacity="0.8"/>
        <path d="M65 42H70V70H65V42Z" fill="currentColor" opacity="0.8"/>
    </svg>
);

const SatelliteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M40 30H60V50H40V30Z" fill="currentColor" opacity="0.9" />
        <path d="M50 50L50 60" stroke="currentColor" strokeWidth="4" />
        <path d="M20 30L80 30L85 25H15L20 30Z" fill="currentColor" opacity="0.5" />
        <path d="M20 50L80 50L85 55H15L20 50Z" fill="currentColor" opacity="0.5" />
        <path d="M50 20C52.7614 20 55 22.2386 55 25C55 27.7614 52.7614 30 50 30C47.2386 30 45 27.7614 45 25C45 22.2386 47.2386 20 50 20Z" fill="currentColor" />
    </svg>
);

const PlaneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M50 10L60 30H40L50 10Z" fill="currentColor" />
        <path d="M45 30H55V80L50 90L45 80V30Z" fill="currentColor" opacity="0.8"/>
        <path d="M20 40L80 40L70 50H30L20 40Z" fill="currentColor" opacity="0.6"/>
    </svg>
);


export default function Hero() {
  const { t } = useI18n();

  return (
    <div id="top" className="hero-wrap w-full min-h-[clamp(450px,60vh,600px)] relative px-gutter max-w-[1280px] mx-auto mt-top">
      <div className="hero-inner relative z-[1] h-full flex items-center justify-center">
        <div className="content-card bg-card rounded-4xl p-[clamp(24px,4vw,48px)] border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5 w-full h-full min-h-[450px] lg:min-h-[550px] flex items-center justify-around gap-8">
            <HumanoidRobotIcon className="w-32 h-32 text-primary opacity-80" />
            <PlaneIcon className="w-40 h-40 text-accent-dark opacity-90" />
            <SatelliteIcon className="w-32 h-32 text-primary/70" />
        </div>
      </div>
    </div>
  );
}
