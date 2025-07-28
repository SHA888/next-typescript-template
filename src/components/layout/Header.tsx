import { useState } from "react";
import { Menu, X, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Documentation", href: "/docs" },
  { name: "Examples", href: "/examples" },
  { name: "About", href: "/about" },
];

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">RT</span>
          </div>
          <span className="font-bold text-xl text-gradient-primary">React Template</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="gradient" size="sm" asChild>
            <a href="#get-started">
              <Star className="mr-2 h-4 w-4" />
              Get Started
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="gradient" size="sm" asChild>
                <a href="#get-started">
                  <Star className="mr-2 h-4 w-4" />
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}