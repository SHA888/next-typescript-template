import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Code,
  ExternalLink,
  Github,
  Star,
  Users,
  Calendar,
  TrendingUp,
  ShoppingCart,
  User,
  Heart,
} from 'lucide-react';

const showcaseProjects = [
  {
    title: 'E-commerce Dashboard',
    description: 'Complete admin dashboard with analytics, product management, and order tracking.',
    image: '/api/placeholder/400/250',
    tags: ['Dashboard', 'Analytics', 'E-commerce'],
    demo: '#',
    code: '#',
    features: ['Real-time analytics', 'Product management', 'Order tracking', 'User management'],
  },
  {
    title: 'Social Media App',
    description: 'Modern social platform with posts, messaging, and user profiles.',
    image: '/api/placeholder/400/250',
    tags: ['Social', 'Messaging', 'Profiles'],
    demo: '#',
    code: '#',
    features: ['Real-time messaging', 'Post creation', 'User profiles', 'Follow system'],
  },
  {
    title: 'Task Management',
    description: 'Collaborative task manager with team features and progress tracking.',
    image: '/api/placeholder/400/250',
    tags: ['Productivity', 'Teams', 'Kanban'],
    demo: '#',
    code: '#',
    features: ['Kanban boards', 'Team collaboration', 'Progress tracking', 'Time tracking'],
  },
];

const componentExamples = [
  {
    name: 'User Profile Card',
    component: (
      <Card className="card-glass max-w-sm">
        <CardHeader className="text-center">
          <Avatar className="mx-auto mb-4 h-20 w-20">
            <AvatarImage src="/api/placeholder/80/80" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <CardTitle>John Doe</CardTitle>
          <p className="text-muted-foreground">Senior Developer</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Profile Completion</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-2" />
            <div className="flex space-x-2 pt-2">
              <Button size="sm" variant="gradient" className="flex-1">
                <User className="mr-1 h-3 w-3" />
                View Profile
              </Button>
              <Button size="sm" variant="outline">
                <Heart className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
  },
  {
    name: 'Stats Card',
    component: (
      <Card className="card-glass max-w-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-gradient-primary text-2xl font-bold">$45,231.89</div>
          <p className="text-sm text-muted-foreground">+20.1% from last month</p>
          <div className="mt-4">
            <Progress value={68} className="h-2" />
          </div>
        </CardContent>
      </Card>
    ),
  },
  {
    name: 'Action Card',
    component: (
      <Card className="card-glass max-w-sm">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <ShoppingCart className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-sm">New Order</CardTitle>
              <p className="text-xs text-muted-foreground">Order #1234</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Customer placed a new order for $299.99
          </p>
          <div className="flex space-x-2">
            <Button size="sm" variant="gradient" className="flex-1">
              View Order
            </Button>
            <Button size="sm" variant="outline">
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    ),
  },
];

export default function Examples() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="surface-gradient py-20 md:py-32">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-6">
            <Code className="mr-1 h-3 w-3" />
            Live Examples
          </Badge>
          <h1 className="text-gradient-hero mb-6 text-4xl font-bold md:text-6xl">
            See It In Action
          </h1>
          <p className="mx-auto max-w-3xl text-balance text-lg text-muted-foreground md:text-xl">
            Explore real-world examples and interactive components built with our React TypeScript
            template.
          </p>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-gradient-primary mb-4 text-3xl font-bold md:text-4xl">
              Component Showcase
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Interactive examples of components you can build with the template.
            </p>
          </div>

          <Tabs defaultValue="components" className="mx-auto max-w-6xl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="projects">Full Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="components" className="mt-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {componentExamples.map((example) => (
                  <div key={example.name} className="space-y-4">
                    <h3 className="text-center font-semibold">{example.name}</h3>
                    <div className="flex justify-center">{example.component}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {showcaseProjects.map((project) => (
                  <Card
                    key={project.title}
                    className="card-glass group overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <div className="text-center">
                        <Code className="mx-auto mb-2 h-12 w-12 text-primary" />
                        <p className="text-sm text-muted-foreground">Preview Image</p>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="mb-4 space-y-1">
                        {project.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <Star className="mr-2 h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="gradient" className="flex-1" asChild>
                          <a href={project.demo}>
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.code}>
                            <Github className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="bg-muted/20 py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Interactive Demo</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Try out the template's features with this interactive dashboard example.
            </p>
          </div>

          <Card className="card-glass mx-auto max-w-4xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    <Calendar className="mr-1 h-3 w-3" />
                    Last 30 days
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-gradient-primary text-2xl font-bold">12,345</div>
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-3 w-3" />
                    Total Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gradient-secondary text-2xl font-bold">$98,765</div>
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Revenue
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gradient-primary text-2xl font-bold">89.2%</div>
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Star className="mr-1 h-3 w-3" />
                    Satisfaction
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button variant="gradient">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
