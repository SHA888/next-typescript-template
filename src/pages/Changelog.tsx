import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";

export default function Changelog() {
  useSEO({
    title: "Changelog – React Template",
    description: "Release notes and updates for the React TypeScript template.",
    canonicalPath: "/changelog",
  });

  return (
    <Layout>
      <main>
        <section className="py-20">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Changelog</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Stay up to date with the latest improvements and fixes.
            </p>

            <div className="space-y-8">
              <article className="border rounded-lg p-6 bg-card">
                <header className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">v1.0.0</h2>
                  <time className="text-sm text-muted-foreground">2025-08-08</time>
                </header>
                <ul className="mt-4 list-disc pl-6 text-sm text-muted-foreground space-y-2">
                  <li>Initial release of the React TypeScript template.</li>
                  <li>Design system, layout, and core pages.</li>
                </ul>
              </article>

              <article className="border rounded-lg p-6 bg-card">
                <header className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">v0.9.0</h2>
                  <time className="text-sm text-muted-foreground">2025-07-20</time>
                </header>
                <ul className="mt-4 list-disc pl-6 text-sm text-muted-foreground space-y-2">
                  <li>Pre-release with navigation, sections, and utilities.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
