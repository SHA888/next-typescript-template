import { ArrowRight, Github, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="surface-gradient absolute inset-0 opacity-50" />

      {/* Grid pattern overlay */}
      <div className="bg-grid-pattern absolute inset-0 opacity-5" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6 inline-flex items-center space-x-2">
            <Badge variant="secondary" className="px-3 py-1">
              <Zap className="mr-1 h-3 w-3" />
              Modern React Template
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="animate-slide-up mb-6 text-balance text-4xl font-bold md:text-6xl lg:text-7xl">
            Build Amazing Apps with <span className="text-gradient-hero">TypeScript & React</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up mx-auto mb-8 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
            A comprehensive, production-ready template featuring modern design system, type safety,
            and developer experience optimizations for rapid development.
          </p>

          {/* CTA Buttons */}
          <div className="animate-scale-in mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="gradient" asChild>
              <a href="#get-started">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-fade-in mx-auto grid max-w-2xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div>
              <div className="text-gradient-primary text-2xl font-bold md:text-3xl">100%</div>
              <div className="text-sm text-muted-foreground">Type Safe</div>
            </div>
            <div>
              <div className="text-gradient-secondary text-2xl font-bold md:text-3xl">50+</div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
            <div>
              <div className="text-gradient-primary text-2xl font-bold md:text-3xl">
                <Star className="mr-1 inline h-6 w-6" />
                5.0
              </div>
              <div className="text-sm text-muted-foreground">Developer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
