import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Lightbulb, Award, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Lead Developer',
    bio: 'Full-stack developer with 8+ years experience in React and TypeScript.',
    avatar: '/api/placeholder/80/80',
    social: {
      github: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Mike Chen',
    role: 'UI/UX Designer',
    bio: 'Design systems expert focused on creating beautiful, accessible interfaces.',
    avatar: '/api/placeholder/80/80',
    social: {
      github: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Alex Rivera',
    role: 'DevOps Engineer',
    bio: 'Infrastructure and automation specialist ensuring smooth deployments.',
    avatar: '/api/placeholder/80/80',
    social: {
      github: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
];

const values = [
  {
    icon: Target,
    title: 'Purpose-Driven',
    description:
      'Every feature and design decision is made with developer productivity and application performance in mind.',
  },
  {
    icon: Users,
    title: 'Community-First',
    description:
      'Built by developers for developers, with continuous feedback and contributions from the community.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Staying ahead of the curve with the latest technologies and best practices in web development.',
  },
  {
    icon: Award,
    title: 'Quality',
    description:
      'Committed to the highest standards of code quality, performance, and maintainability.',
  },
];

const stats = [
  { label: 'GitHub Stars', value: '12.5k' },
  { label: 'Downloads', value: '50k+' },
  { label: 'Contributors', value: '150+' },
  { label: 'Projects Built', value: '1000+' },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="surface-gradient py-20 md:py-32">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-6">
            <Users className="mr-1 h-3 w-3" />
            About Us
          </Badge>
          <h1 className="text-gradient-hero mb-6 text-4xl font-bold md:text-6xl">
            Built by Developers, <span className="text-gradient-secondary">for Developers</span>
          </h1>
          <p className="mx-auto max-w-3xl text-balance text-lg text-muted-foreground md:text-xl">
            We're passionate about creating tools that make web development faster, more enjoyable,
            and more productive for teams of all sizes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-gradient-primary mb-6 text-3xl font-bold md:text-4xl">
              Our Mission
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              To democratize modern web development by providing a comprehensive, well-documented
              template that embodies industry best practices and enables developers to focus on
              building great user experiences rather than boilerplate setup.
            </p>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-gradient-primary mb-2 text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/20 py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Values</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              The principles that guide our work and shape our decisions.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title} className="card-glass text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                    <value.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-gradient-secondary mb-4 text-3xl font-bold md:text-4xl">
              Meet the Team
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              The passionate individuals behind the React TypeScript Template.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {team.map((member) => (
              <Card
                key={member.name}
                className="card-glass group text-center transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 transition-transform duration-300 group-hover:scale-110">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="font-medium text-primary">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 leading-relaxed text-muted-foreground">{member.bio}</p>
                  <div className="flex justify-center space-x-2">
                    <Button size="sm" variant="ghost" asChild>
                      <a href={member.social.github}>
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={member.social.twitter}>
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={member.social.linkedin}>
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-muted/20 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Get In Touch</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Have questions, suggestions, or want to contribute? We'd love to hear from you!
            </p>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="card-glass">
                <CardContent className="p-6 text-center">
                  <Mail className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@reacttemplate.dev</p>
                </CardContent>
              </Card>

              <Card className="card-glass">
                <CardContent className="p-6 text-center">
                  <Github className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">GitHub</h3>
                  <p className="text-sm text-muted-foreground">Open source contributions</p>
                </CardContent>
              </Card>

              <Card className="card-glass">
                <CardContent className="p-6 text-center">
                  <Users className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">Community</h3>
                  <p className="text-sm text-muted-foreground">Join our Discord server</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="gradient" size="lg">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Contribute
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
