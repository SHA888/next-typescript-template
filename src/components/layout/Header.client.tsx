"use client";

import { useState } from 'react';
import { Menu, X, Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Examples', href: '/examples' },
  { name: 'About', href: '/about' },
];

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur',
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
            <span className="text-primary-foreground text-sm font-bold">NT</span>
          </div>
          <span className="text-foreground text-xl font-bold">Next Template</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-primary text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center space-x-2 md:flex">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="gradient" size="sm" asChild>
            <a href="#get-started">
              <Star className="mr-2 h-4 w-4" />
              Get Started
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="bg-background border-t md:hidden">
          <div className="container space-y-4 py-4">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:text-primary text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 border-t pt-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="gradient" size="sm" asChild>
                <a href="#get-started">
                  <Star className="mr-2 h-4 w-4" />
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
