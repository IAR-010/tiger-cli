import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Amazonbot'],
        allow: '/',
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tiger.x010.tech'}/sitemap.xml`,
  };
}