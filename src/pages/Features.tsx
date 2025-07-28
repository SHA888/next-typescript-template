import { Layout } from "@/components/layout/Layout";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code2, Palette, Zap } from "lucide-react";

const technicalFeatures = [
  {
    category: "Development",
    icon: Code2,
    items: [
      "React 18 with latest features",
      "TypeScript 5.0+ for type safety", 
      "Vite for lightning-fast builds",
      "ESLint & Prettier configuration",
      "Hot module replacement",
      "Component-driven development"
    ]
  },
  {
    category: "Design System",
    icon: Palette,
    items: [
      "HSL-based color tokens",
      "Semantic design variables",
      "Dark/light mode support",
      "Responsive breakpoints",
      "Custom CSS properties",
      "Component variants system"
    ]
  },
  {
    category: "Performance",
    icon: Zap,
    items: [
      "Tree shaking optimization",
      "Code splitting strategies",
      "Lazy loading components",
      "Bundle size analysis",
      "Web Vitals monitoring",
      "Progressive enhancement"
    ]
  }
];

export default function Features() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 surface-gradient">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-6">
            Complete Feature Set
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-hero">
            Powerful Features
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Everything you need to build modern, scalable web applications with confidence and speed.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <FeaturesSection />

      {/* Technical Deep Dive */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on proven technologies and modern development practices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {technicalFeatures.map((section) => (
              <Card key={section.category} className="card-glass">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{section.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
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