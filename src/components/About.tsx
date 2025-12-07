'use client';

import { useTranslations } from 'next-intl';

export default function About() {
    const t = useTranslations('About');

    return (
        <section id="about" className="py-20 bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-12">{t('title')}</h2>
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-gray-300 mb-6">{t('p1')}</p>
                    <p className="text-lg text-gray-300 mb-6">{t('p2')}</p>
                    <p className="text-lg text-gray-300">{t('p3')}</p>
                </div>
            </div>
        </section>
    );
}
