import type { Metadata } from 'next';
import '../globals.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Footer from '@/components/Footer';

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
        <html lang={locale}>
        <body className="bg-gray-900 text-white">
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
                <Footer />
            </NextIntlClientProvider>
        </body>
        </html>
    );
}