import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";

export default function Help() {
  useSEO({
    title: "Help Center – React Template",
    description: "Find answers to common questions and get support.",
    canonicalPath: "/help",
  });

  const faqs = [
    { q: "How do I start?", a: "Install dependencies, run the dev server, and explore the pages." },
    { q: "Can I customize the design?", a: "Yes, edit tokens in index.css and tailwind.config.ts." },
  ];

  return (
    <Layout>
      <main>
        <section className="py-20">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Quick answers to common questions.
            </p>

            <div className="space-y-6">
              {faqs.map((f) => (
                <article key={f.q} className="border rounded-lg p-6 bg-card">
                  <h2 className="font-semibold">{f.q}</h2>
                  <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
