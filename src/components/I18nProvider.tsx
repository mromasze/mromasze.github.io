'use client';

import { useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Cookies from 'js-cookie';
import { LocaleContext } from '@/contexts/LocaleContext';

type Messages = Record<string, unknown>;

function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState('pl');
    const [messages, setMessages] = useState<Messages | null>(null);

    useEffect(() => {
        const savedLocale = Cookies.get('locale');
        const browserLocale = navigator.language.split('-')[0];
        const initialLocale = savedLocale || (['en', 'pl'].includes(browserLocale) ? browserLocale : 'pl');
        setLocale(initialLocale);
    }, []);

    useEffect(() => {
        if (locale) {
            const loadMessages = async () => {
                const msgs = (await import(`../../messages/${locale}.json`)).default;
                setMessages(msgs);
                document.documentElement.lang = locale;
            };
            loadMessages();
            Cookies.set('locale', locale, { expires: 365 });
        }
    }, [locale]);
    
    if (!messages) {
        return null; // Or a loading spinner
    }

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </LocaleContext.Provider>
    );
}

export default I18nProvider;
