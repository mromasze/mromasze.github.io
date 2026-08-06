# mromasze.dev portfolio

Portfolio is a statically exported Next.js application. Production is hosted by the
same server as Driperska Liga, but as an independent nginx static site. The default
GitHub Pages address redirects visitors to `https://mromasze.dev`.

The complete server, Cloudflare and GitHub configuration is documented in
[`deploy/README.md`](deploy/README.md).

## Getting Started

First, run the development server:

```bash
npm run dev
# o
yan dev
# o
pnpm dev
# o
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Lean More

To lean more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - lean about Next.js features and API.
- [Lean Next.js](https://nextjs.org/lean) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

A push to `main` runs a production build, deploys the exported site to the
VPS over SSH, and then publishes the GitHub Pages redirect. The first deployment
requires the one-time server, Cloudflare and GitHub environment setup described in
the deployment guide.
