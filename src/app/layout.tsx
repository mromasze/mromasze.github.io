import type { Metadata } from 'next';
import './globals.css';
import I18nProvider from '@/components/I18nProvider';
import { ThemeProvider } from '@/components/ThemeProvider';

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
        // suppressHydrationWarning: next-themes stamps the theme class onto <html> before
        // React hydrates, so the server and client markup differ here by design.
        <html lang="pl" suppressHydrationWarning>
        <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <I18nProvider>{children}</I18nProvider>
            </ThemeProvider>
        </body>
        </html>
    );
}
