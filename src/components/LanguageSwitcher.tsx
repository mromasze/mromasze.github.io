'use client';

import { useLocale } from '@/contexts/LocaleContext';

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();

    const switchLanguage = (nextLocale: string) => {
        setLocale(nextLocale);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={() => switchLanguage('pl')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${locale === 'pl' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            >
                PL
            </button>
            <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${locale === 'en' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            >
                EN
            </button>
        </div>
    );
}
