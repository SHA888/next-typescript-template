import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Next.js 14+ Template
        </h1>
        <div className="flex justify-center gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </main>
  );
}
