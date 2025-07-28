import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Examples', href: '/examples' },
    { name: 'Changelog', href: '/changelog' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Community', href: '/community' },
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <div className="from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
                <span className="text-primary-foreground text-sm font-bold">RT</span>
              </div>
              <span className="text-gradient-primary text-xl font-bold">React Template</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              A modern, type-safe React TypeScript template with beautiful design system, optimized
              for rapid development and scalable applications.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((item) => (
                <Button key={item.name} variant="ghost" size="sm" asChild>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.icon className="h-4 w-4" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-muted-foreground mt-8 flex flex-col items-center justify-between border-t pt-8 text-sm md:flex-row">
          <div className="flex items-center space-x-1">
            <span>© 2025 React Template. Made with</span>
            <Heart className="h-4 w-4 fill-current text-red-500" />
            <span>by developers, for developers.</span>
          </div>
          <div className="mt-4 md:mt-0">
            <span>Built with React, TypeScript, and Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
