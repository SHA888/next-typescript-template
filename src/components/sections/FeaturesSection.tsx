import { 
  Code, 
  Palette, 
  Zap, 
  Shield, 
  Smartphone, 
  Globe,
  Database,
  Cpu,
  Settings
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Code,
    title: "TypeScript First",
    description: "Full type safety across frontend and backend with comprehensive type definitions and intelligent autocomplete."
  },
  {
    icon: Palette,
    title: "Design System",
    description: "Beautiful, consistent design tokens with customizable themes, gradients, and semantic color palettes."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized build pipeline with Vite, code splitting, and tree shaking for minimal bundle sizes."
  },
  {
    icon: Shield,
    title: "Production Ready",
    description: "ESLint, Prettier, and comprehensive testing setup with pre-commit hooks for code quality."
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Responsive design patterns with mobile-first approach and touch-friendly interactions."
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description: "Built-in meta tags, structured data, and performance optimizations for better search rankings."
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Integrated with React Query for efficient data fetching, caching, and synchronization."
  },
  {
    icon: Cpu,
    title: "Performance",
    description: "Lazy loading, code splitting, and performance monitoring with Web Vitals tracking."
  },
  {
    icon: Settings,
    title: "Developer Experience",
    description: "Hot reload, comprehensive tooling, and extensive documentation for productive development."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient-primary">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Built with modern development practices and industry best practices to accelerate your project delivery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="card-glass hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
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