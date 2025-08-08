import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";

export default function Contact() {
  useSEO({
    title: "Contact – React Template",
    description: "Get in touch with the team behind the React TypeScript template.",
    canonicalPath: "/contact",
  });

  return (
    <Layout>
      <main>
        <section className="py-20">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              We’d love to hear from you. Reach out via the channels below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="border rounded-lg p-6 bg-card">
                <h2 className="font-semibold">Email</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  <a href="mailto:hello@example.com" className="underline">hello@example.com</a>
                </p>
              </article>
              <article className="border rounded-lg p-6 bg-card">
                <h2 className="font-semibold">Support</h2>
                <p className="text-sm text-muted-foreground mt-2">Open a ticket in the Help Center.</p>
              </article>
              <article className="border rounded-lg p-6 bg-card">
                <h2 className="font-semibold">Community</h2>
                <p className="text-sm text-muted-foreground mt-2">Join discussions in our community channels.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
