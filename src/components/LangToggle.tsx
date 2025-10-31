'use client';
import { useI18n } from '@/hooks/useI18n';

export default function LangToggle() {
    const { t, setLang, lang } = useI18n();
    
    const handleToggle = () => {
        const newLang = lang === 'en' ? 'fr' : 'en';
        setLang(newLang);
    };

    return (
        <button className="btn" onClick={handleToggle} aria-label="Switch language">
            {t('langBtn')}
        </button>
    );
}
