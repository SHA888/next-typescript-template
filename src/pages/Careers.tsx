import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";

export default function Careers() {
  useSEO({
    title: "Careers – React Template",
    description: "Explore open roles and join the React TypeScript template project.",
    canonicalPath: "/careers",
  });

  const roles = [
    { title: "Frontend Engineer (React)", type: "Full-time", location: "Remote" },
    { title: "UI/UX Designer", type: "Contract", location: "Remote" },
  ];

  return (
    <Layout>
      <main>
        <section className="py-20">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              We’re building beautiful, scalable tools. Join us!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => (
                <article key={role.title} className="border rounded-lg p-6 bg-card">
                  <h2 className="font-semibold">{role.title}</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    {role.type} • {role.location}
                  </p>
                  <div className="mt-4">
                    <a href="#" className="text-primary underline">View details</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
