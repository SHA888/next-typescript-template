import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={className || 'flex-1'}>{children}</main>
      <Footer />
    </div>
  );
}
