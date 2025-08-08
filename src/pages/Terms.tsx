import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";

export default function Terms() {
  useSEO({
    title: "Terms of Service – React Template",
    description: "Review the terms and conditions for using this template.",
    canonicalPath: "/terms",
  });

  return (
    <Layout>
      <main>
        <section className="py-20">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
              <p>
                By using this template, you agree to these terms. This is a sample document.
              </p>
              <h2>Use of Template</h2>
              <p>
                You may modify and distribute the template according to your project needs.
              </p>
              <h2>Limitation of Liability</h2>
              <p>
                The template is provided "as is" without warranty of any kind.
              </p>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}
