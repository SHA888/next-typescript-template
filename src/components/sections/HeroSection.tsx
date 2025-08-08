import { ArrowRight, Github, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 surface-gradient opacity-50" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 mb-6 animate-fade-in">
            <Badge variant="secondary" className="px-3 py-1">
              <Zap className="mr-1 h-3 w-3" />
              Modern React Template
            </Badge>
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up text-balance">
            Build Amazing Apps with{" "}
            <span className="text-gradient-hero">
              TypeScript & React
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up text-balance">
            A comprehensive, production-ready template featuring modern design system, 
            type safety, and developer experience optimizations for rapid development.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto text-center animate-fade-in">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-primary">100%</div>
              <div className="text-sm text-muted-foreground">Type Safe</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-secondary">50+</div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-primary">
                <Star className="inline h-6 w-6 mr-1" />
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