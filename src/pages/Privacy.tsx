import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy – React Template",
    description: "Read our privacy policy and learn how we handle your data.",
    canonicalPath: "/privacy",
  });

  return (
    <Layout>
      <main>
        <section className="py-20">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
              <p>
                We respect your privacy. This template does not collect personal data by default.
              </p>
              <h2>Data Collection</h2>
              <p>
                If you add analytics or third-party services, review their policies and ensure compliance.
              </p>
              <h2>Contact</h2>
              <p>
                For questions, contact us at <a href="mailto:privacy@example.com">privacy@example.com</a>.
              </p>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}
