'use client';
import { useI18n } from '@/hooks/useI18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site mt-20 py-8 px-gutter pb-16 border-t border-white/5 max-w-[1280px] mx-auto flex items-center justify-between gap-4 flex-wrap">
      <span>{t('copyright')}</span>
      <div className="social-links flex gap-4">
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:hello@example.com">Email</a>
      </div>
    </footer>
  );
}
