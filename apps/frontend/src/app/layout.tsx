import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Providers } from '@/providers';
import './globals.css';

// Optimize font loading with display: 'swap' and preload
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata = {
  title: 'Next.js TypeScript Template',
  description: 'A modern full-stack web application template',
  other: {
    'http-equiv': 'x-ua-compatible',
    content: 'IE=edge',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
