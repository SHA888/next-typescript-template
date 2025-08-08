import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, Palette, Settings, FileText, ExternalLink } from "lucide-react";

const quickStartSteps = [
  {
    step: "1",
    title: "Clone the Template", 
    description: "Get started by cloning the repository to your local machine.",
    code: "git clone https://github.com/your-org/react-template.git\ncd react-template"
  },
  {
    step: "2",
    title: "Install Dependencies",
    description: "Install all required packages using your preferred package manager.",
    code: "npm install\n# or\nyarn install\n# or\npnpm install"
  },
  {
    step: "3",
    title: "Start Development",
    description: "Launch the development server and start building your application.",
    code: "npm run dev\n# Your app will be available at http://localhost:5173"
  },
  {
    step: "4",
    title: "Customize & Build",
    description: "Customize the design system, add your components, and build something amazing!",
    code: "# Edit src/index.css for design tokens\n# Create components in src/components\n# Add pages in src/pages"
  }
];

const docSections = [
  {
    title: "Getting Started",
    icon: BookOpen,
    description: "Learn the basics and set up your development environment",
    articles: ["Installation", "Project Structure", "Development Workflow", "Configuration"]
  },
  {
    title: "Components",
    icon: Code,
    description: "Comprehensive guide to all available components and their usage",
    articles: ["Button Variants", "Form Components", "Layout Components", "Data Display"]
  },
  {
    title: "Design System",
    icon: Palette,
    description: "Understanding and customizing the design tokens and themes",
    articles: ["Color Tokens", "Typography", "Spacing", "Animations"]
  },
  {
    title: "Advanced",
    icon: Settings,
    description: "Advanced topics for building production-ready applications",
    articles: ["Performance", "Testing", "Deployment", "Best Practices"]
  }
];

export default function Documentation() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 surface-gradient">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-6">
            <FileText className="mr-1 h-3 w-3" />
            Documentation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-hero">
            Get Started Fast
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Comprehensive documentation to help you build amazing applications with our React TypeScript template.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
              Quick Start Guide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get up and running in minutes with these simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {quickStartSteps.map((step) => (
              <Card key={step.step} className="card-glass">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground whitespace-pre-wrap">{step.code}</pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Documentation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore detailed guides for every aspect of the template.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {docSections.map((section) => (
              <Card key={section.title} className="card-glass hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {section.articles.map((article) => (
                      <li key={article} className="flex items-center space-x-2 text-sm">
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                          {article}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" className="w-full">
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-secondary">
              Code Examples
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See the template in action with practical examples.
            </p>
          </div>

          <Tabs defaultValue="component" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="component">Component</TabsTrigger>
              <TabsTrigger value="styling">Styling</TabsTrigger>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            </TabsList>
            
            <TabsContent value="component" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Creating a Custom Component</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground">{`import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card className="card-glass">
      <CardHeader>
        <CardTitle>Custom Component</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="gradient">
          Click me!
        </Button>
      </CardContent>
    </Card>
  );
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="styling" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Using Design System Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground">{`/* Using semantic tokens in CSS */
.my-component {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  background: var(--gradient-primary);
}

/* Using utility classes */
<div className="bg-primary text-primary-foreground">
  <h1 className="text-gradient-hero">
    Beautiful heading
  </h1>
</div>`}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="typescript" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>TypeScript Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground">{`interface UserProps {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export function UserCard({ name, email, role }: UserProps) {
  const handleClick = (userId: string) => {
    // Type-safe event handling
    console.log('User clicked:', userId);
  };

  return (
    <Card>
      <CardContent>
        <h3>{name}</h3>
        <p>{email}</p>
        <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
          {role}
        </Badge>
      </CardContent>
    </Card>
  );
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}