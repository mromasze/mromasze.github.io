'use client';

import { useTranslations } from 'next-intl';

export default function Contact() {
    const t = useTranslations('Contact');

    return (
        <section id="contact" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-12">{t('title')}</h2>
                <div className="max-w-3xl mx-auto">
                    <form className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-300">
                                {t('nameLabel')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-3 px-4 text-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-300">
                                {t('emailLabel')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-3 px-4 text-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-gray-300">
                                {t('messageLabel')}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-3 px-4 text-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200"
                            >
                                {t('sendButton')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
