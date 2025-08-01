import { MainLayout } from '@/components/layout/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Next.js TypeScript Template
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            A modern, full-stack web application template with Next.js, TypeScript, and Prisma.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
