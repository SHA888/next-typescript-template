import { Layout } from '@/components/layout/Layout';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Code2, Palette, Zap } from 'lucide-react';

const technicalFeatures = [
  {
    category: 'Development',
    icon: Code2,
    items: [
      'React 18 with latest features',
      'TypeScript 5.0+ for type safety',
      'Vite for lightning-fast builds',
      'ESLint & Prettier configuration',
      'Hot module replacement',
      'Component-driven development',
    ],
  },
  {
    category: 'Design System',
    icon: Palette,
    items: [
      'HSL-based color tokens',
      'Semantic design variables',
      'Dark/light mode support',
      'Responsive breakpoints',
      'Custom CSS properties',
      'Component variants system',
    ],
  },
  {
    category: 'Performance',
    icon: Zap,
    items: [
      'Tree shaking optimization',
      'Code splitting strategies',
      'Lazy loading components',
      'Bundle size analysis',
      'Web Vitals monitoring',
      'Progressive enhancement',
    ],
  },
];

export default function Features() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="surface-gradient py-20 md:py-32">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-6">
            Complete Feature Set
          </Badge>
          <h1 className="text-gradient-hero mb-6 text-4xl font-bold md:text-6xl">
            Powerful Features
          </h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg text-balance md:text-xl">
            Everything you need to build modern, scalable web applications with confidence and
            speed.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <FeaturesSection />

      {/* Technical Deep Dive */}
      <section className="bg-muted/20 py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Technical Excellence</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Built on proven technologies and modern development practices.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {technicalFeatures.map((section) => (
              <Card key={section.category} className="card-glass">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="from-primary to-secondary flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br">
                      <section.icon className="text-primary-foreground h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{section.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start space-x-3">
                        <CheckCircle className="text-success mt-0.5 h-5 w-5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
