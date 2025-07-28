import {
  Code,
  Palette,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Database,
  Cpu,
  Settings,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Code,
    title: 'TypeScript First',
    description:
      'Full type safety across frontend and backend with comprehensive type definitions and intelligent autocomplete.',
  },
  {
    icon: Palette,
    title: 'Design System',
    description:
      'Beautiful, consistent design tokens with customizable themes, gradients, and semantic color palettes.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized build pipeline with Vite, code splitting, and tree shaking for minimal bundle sizes.',
  },
  {
    icon: Shield,
    title: 'Production Ready',
    description:
      'ESLint, Prettier, and comprehensive testing setup with pre-commit hooks for code quality.',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description:
      'Responsive design patterns with mobile-first approach and touch-friendly interactions.',
  },
  {
    icon: Globe,
    title: 'SEO Optimized',
    description:
      'Built-in meta tags, structured data, and performance optimizations for better search rankings.',
  },
  {
    icon: Database,
    title: 'Data Management',
    description:
      'Integrated with React Query for efficient data fetching, caching, and synchronization.',
  },
  {
    icon: Cpu,
    title: 'Performance',
    description:
      'Lazy loading, code splitting, and performance monitoring with Web Vitals tracking.',
  },
  {
    icon: Settings,
    title: 'Developer Experience',
    description:
      'Hot reload, comprehensive tooling, and extensive documentation for productive development.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-gradient-primary mb-4 text-3xl font-bold md:text-5xl">
            Everything You Need
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
            Built with modern development practices and industry best practices to accelerate your
            project delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="card-glass animate-fade-in group transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="from-primary to-secondary mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="text-primary-foreground h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
