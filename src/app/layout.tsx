import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header.client';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yourwebsite.com'),
  title: {
    default: 'Next.js TypeScript Template',
    template: '%s | Next.js Template',
  },
  description: 'A modern Next.js template with TypeScript, Tailwind CSS, and shadcn/ui',
  keywords: [
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'shadcn/ui',
    'React',
    'Template',
  ],
  authors: [
    {
      name: 'Your Name',
      url: 'https://yourwebsite.com',
    },
  ],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Next.js TypeScript Template',
    description: 'A modern Next.js template with TypeScript, Tailwind CSS, and shadcn/ui',
    siteName: 'Next.js Template',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js TypeScript Template',
    description: 'A modern Next.js template with TypeScript, Tailwind CSS, and shadcn/ui',
    creator: '@yourtwitter',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
