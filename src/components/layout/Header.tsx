'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export function Header() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Examples', href: '/examples' },
    { name: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Next.js Template</span>
          </Link>
          <nav className="flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href || '#'}
                className="flex items-center text-sm font-medium text-muted-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
