import type { Metadata } from 'next';
import './globals.css';
import I18nProvider from '@/components/I18nProvider';

export const metadata: Metadata = {
    title: 'Portfolio | Michał Romaszewski',
    description: 'Portfolio of a software developer specializing in programming safe and secure applications.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
        <body className="bg-gray-900 text-white">
            <I18nProvider>{children}</I18nProvider>
        </body>
        </html>
    );
}
