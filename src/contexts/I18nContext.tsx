"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { I18N, TranslationKeys } from '@/lib/i18n';

type Lang = 'en' | 'fr';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKeys) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem('lang');
    if (storedLang === 'en' || storedLang === 'fr') {
      setLangState(storedLang);
      document.documentElement.lang = storedLang;
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    if(isMounted) {
      localStorage.setItem('lang', newLang);
      document.documentElement.lang = newLang;
    }
  }, [isMounted]);

  const t = useCallback((key: TranslationKeys): string => {
    if (!isMounted) return ''; // Return empty string or a placeholder during SSR/pre-hydration
    const dict = I18N[lang] || I18N.en;
    return dict[key] || key;
  }, [lang, isMounted]);

  const value = { lang, setLang, t };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}
