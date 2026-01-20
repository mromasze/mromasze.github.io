import type { Metadata } from 'next';
import '../globals.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/ThemeProvider';

import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

export const metadata: Metadata = {
    title: 'Portfolio | Software Developer',
    description: 'Portfolio of a software developer specializing in web development',
};

// Can be imported from a shared config
const locales = ['en', 'pl'];

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!locales.includes(locale)) {
        notFound();
    }
    
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
        <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Preloader />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </ThemeProvider>
        </body>
        </html>
    );
}