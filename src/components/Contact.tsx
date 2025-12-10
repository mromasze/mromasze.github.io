'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Contact() {
    const t = useTranslations('Contact');

    return (
        <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">{t('title')}</h2>
                    <p className="text-gray-400">{t('callToAction')}</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="peer w-full bg-transparent border-b-2 border-gray-700 text-white placeholder-transparent focus:border-blue-500 focus:outline-none py-3 transition-colors duration-300"
                                placeholder="Name"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-0 -top-3.5 text-sm text-blue-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                {t('nameLabel')}
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="peer w-full bg-transparent border-b-2 border-gray-700 text-white placeholder-transparent focus:border-blue-500 focus:outline-none py-3 transition-colors duration-300"
                                placeholder="Email"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-0 -top-3.5 text-sm text-blue-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                {t('emailLabel')}
                            </label>
                        </div>
                    </div>

                    <div className="relative">
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="peer w-full bg-transparent border-b-2 border-gray-700 text-white placeholder-transparent focus:border-blue-500 focus:outline-none py-3 transition-colors duration-300 resize-none"
                            placeholder="Message"
                        ></textarea>
                        <label
                            htmlFor="message"
                            className="absolute left-0 -top-3.5 text-sm text-blue-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            {t('messageLabel')}
                        </label>
                    </div>

                    <div className="text-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="inline-block px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300"
                        >
                            {t('sendButton')}
                        </motion.button>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}