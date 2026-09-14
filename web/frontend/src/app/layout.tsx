import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tiger-framework.org'),
  title: {
    default: 'Tiger Framework — Next-Gen 3D Glassmorphic Full-Stack Meta-Framework',
    template: '%s | Tiger Framework',
  },
  description:
    'Tiger Framework is an open-source full-stack meta-framework powered by Tiger CLI. Scaffold FastAPI or Express backends, PostgreSQL/MySQL databases, and Next.js 16.3.5 frontends with 3D Glassmorphism, automated Git pipelines, and AI copilot in seconds. Proudly backed by x010.tech.',
  keywords: [
    'Tiger Framework',
    'Tiger CLI',
    'Full-Stack Meta-Framework',
    '3D Glassmorphism UI',
    'Next.js 16.3.5 Framework',
    'FastAPI Scaffolding',
    'x010.tech',
    'IAR-010',
    'Developer Toolchain',
    'Alembic Migrations CLI',
    'Autonomous Git Push',
    'Tailwind 3D Glass',
    'React Glassmorphism',
    'Docker Compose Automation',
    'Nginx Reverse Proxy SSL',
    'AI Route Synthesizer',
    'Python Full-Stack Framework',
    'Node.js Express Meta-Stack',
    'Open Source Developer Platform',
    'Software Architecture Scaffolder',
    'Tiger Studio TUI',
    'Tiger Doctor Diagnostics',
  ],
  authors: [
    { name: 'Tiger Framework Team', url: 'https://github.com/IAR-010/tiger-cli' },
    { name: 'x010.tech', url: 'https://x010.tech' },
  ],
  creator: 'x010.tech',
  publisher: 'x010.tech',
  applicationName: 'Tiger Framework',
  generator: 'Tiger CLI 0.1.0',
  category: 'Technology & Developer Tools',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://tiger-framework.org',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tiger-framework.org',
    siteName: 'Tiger Framework',
    title: 'Tiger Framework — Build Full-Stack Apps at the Speed of a Roar',
    description:
      'High-velocity full-stack meta-framework with FastAPI/Express, PostgreSQL, Next.js 16.3.5, 3D Glassmorphic UI Kit, and autonomous Git tools. Powered by x010.tech.',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Tiger Framework Official 3D Glassmorphic Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiger Framework — 3D Glassmorphic Full-Stack Meta-Framework',
    description:
      'Scaffold full-stack FastAPI/Next.js 16.3.5 apps with 3D Glassmorphism, database migrations, and autonomous Git push in under 2 seconds. Powered by x010.tech.',
    images: ['/logo.png'],
    creator: '@x010tech',
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Tiger Framework',
        alternateName: 'Tiger CLI',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Windows, macOS, Linux',
        description:
          'Command-line based full-stack meta-framework for scaffolding FastAPI/Express backends, Next.js 16.3.5 frontends with 3D Glassmorphism, and database migrations.',
        url: 'https://tiger-framework.org',
        codeRepository: 'https://github.com/IAR-010/tiger-cli',
        license: 'https://opensource.org/licenses/MIT',
        softwareVersion: '0.1.0',
        author: {
          '@type': 'Organization',
          name: 'x010.tech',
          url: 'https://x010.tech',
        },
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'Organization',
        name: 'Tiger Framework',
        url: 'https://tiger-framework.org',
        logo: 'https://tiger-framework.org/logo.png',
        parentOrganization: {
          '@type': 'Organization',
          name: 'x010.tech',
          url: 'https://x010.tech',
        },
        sameAs: [
          'https://github.com/IAR-010/tiger-cli',
          'https://x010.tech',
          'https://github.com/IAR-010',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Tiger Framework?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tiger Framework is an open-source full-stack meta-framework created by x010.tech and IAR-010. It integrates FastAPI or Express backends with Next.js 16.3.5 App Router, PostgreSQL/MySQL/SQLite databases, Alembic migrations, and a hardware-accelerated 3D Glassmorphic UI library into a single CLI toolchain.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I install Tiger CLI on Windows or Linux?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'On Windows PowerShell run: irm https://raw.githubusercontent.com/IAR-010/tiger-cli/main/scripts/install.ps1 | iex. On macOS or Linux run: curl -fsSL https://raw.githubusercontent.com/IAR-010/tiger-cli/main/scripts/install.sh | bash. Or run without installation using NPX: npx tiger-cli create-app <project-name>.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the relationship between Tiger Framework and x010.tech?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tiger Framework is developed and maintained as an open-source technology project backed by parent company x010.tech and published under the IAR-010 GitHub organization.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is tiger.lock in a Tiger Framework project?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'tiger.lock is the official framework integrity and signature file that verifies authentic scaffolding, carries the embedded official 3D Tiger logo data URI, and provides parent company provenance by x010.tech.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`dark ${orbitron.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                if (window.location.hash) {
                  history.replaceState(null, '', window.location.pathname + window.location.search);
                }
                window.scrollTo(0, 0);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-[#09090b] text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}