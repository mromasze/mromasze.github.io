'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/hero-bg.gif)' }}
                ></div>
                <div className="absolute inset-0 bg-black/70"></div>
            </div>


            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    {t('greeting')}{' '}
                    <span className="text-blue-500">{t('name')}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                    {t('subtitle')}
                </p>
                <div className="flex gap-4 justify-center">
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200"
                    >
                        {t('projectsButton')}
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                    >
                        {t('contactButton')}
                    </a>
                </div>
            </div>
        </section>
    );
}
