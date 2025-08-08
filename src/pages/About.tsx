import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  Users, 
  Lightbulb, 
  Award,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Calendar,
  MapPin
} from "lucide-react";

const team = [
  {
    name: "Sarah Johnson",
    role: "Lead Developer",
    bio: "Full-stack developer with 8+ years experience in React and TypeScript.",
    avatar: "/api/placeholder/80/80",
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Mike Chen",
    role: "UI/UX Designer", 
    bio: "Design systems expert focused on creating beautiful, accessible interfaces.",
    avatar: "/api/placeholder/80/80",
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Alex Rivera",
    role: "DevOps Engineer",
    bio: "Infrastructure and automation specialist ensuring smooth deployments.",
    avatar: "/api/placeholder/80/80",
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#"
    }
  }
];

const values = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description: "Every feature and design decision is made with developer productivity and application performance in mind."
  },
  {
    icon: Users,
    title: "Community-First",
    description: "Built by developers for developers, with continuous feedback and contributions from the community."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Staying ahead of the curve with the latest technologies and best practices in web development."
  },
  {
    icon: Award,
    title: "Quality",
    description: "Committed to the highest standards of code quality, performance, and maintainability."
  }
];

const stats = [
  { label: "GitHub Stars", value: "12.5k" },
  { label: "Downloads", value: "50k+" },
  { label: "Contributors", value: "150+" },
  { label: "Projects Built", value: "1000+" }
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 surface-gradient">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-6">
            <Users className="mr-1 h-3 w-3" />
            About Us
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-hero">
            Built by Developers,{" "}
            <span className="text-gradient-secondary">for Developers</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            We're passionate about creating tools that make web development faster, 
            more enjoyable, and more productive for teams of all sizes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-primary">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              To democratize modern web development by providing a comprehensive, 
              well-documented template that embodies industry best practices and enables 
              developers to focus on building great user experiences rather than boilerplate setup.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gradient-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and shape our decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value) => (
              <Card key={value.title} className="card-glass text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-secondary">
              Meet the Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind the React TypeScript Template.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="card-glass text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {member.bio}
                  </p>
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
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions, suggestions, or want to contribute? We'd love to hear from you!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="card-glass">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@reacttemplate.dev</p>
                </CardContent>
              </Card>
              
              <Card className="card-glass">
                <CardContent className="p-6 text-center">
                  <Github className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">GitHub</h3>
                  <p className="text-sm text-muted-foreground">Open source contributions</p>
                </CardContent>
              </Card>
              
              <Card className="card-glass">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">Join our Discord server</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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