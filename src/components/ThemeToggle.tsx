'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';

export default function ThemeToggle() {
    const { t } = useI18n();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
        document.body.classList.toggle('dark', storedTheme === 'dark');
    }, []);

    const handleToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        document.body.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <button className="btn" onClick={handleToggle} aria-label="Toggle theme">
            {t('themeBtn')}
        </button>
    );
}
