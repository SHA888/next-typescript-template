import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";

export default function Blog() {
  useSEO({
    title: "Blog – React Template",
    description: "Articles and updates from the React TypeScript template.",
    canonicalPath: "/blog",
  });

  return (
    <Layout>
      <main>
        <section className="py-20">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Insights, tips, and updates. Posts coming soon.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article className="border rounded-lg p-6 bg-card">
                <h2 className="font-semibold">Welcome to the Blog</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  We will publish best practices and guides for building modern apps.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
