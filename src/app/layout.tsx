import type { Metadata } from 'next';
import './globals.css';
import I18nProvider from '@/components/I18nProvider';

export const metadata: Metadata = {
    title: 'Portfolio | Software Developer',
    description: 'Portfolio of a software developer specializing in web development',
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
