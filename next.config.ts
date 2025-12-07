const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    basePath: isProd ? '/mromasze-portfolio' : '',
    assetPrefix: isProd ? '/mromasze-portfolio' : '',
    reactCompiler: true,
};

module.exports = nextConfig;
