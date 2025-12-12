import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: any = {
    output: 'export',
    reactCompiler: true,
    images: {
        unoptimized: true,
    },
};

export default withNextIntl(nextConfig);