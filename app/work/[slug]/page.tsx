import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export async function generateStaticParams() {
  const { data } = await supabase.from("projects").select("slug").eq("status", "published");

  return data?.map((p) => ({ slug: p.slug })) ?? [];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const { data: project } = await supabase.from("projects").select("*").eq("slug", slug).single();

  if (!project) notFound();

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-0 py-12 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>

        {project.hero_image && (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-10">
            <Image
              src={project.hero_image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <div className="space-y-6 mb-16">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">{project.title}</h1>
            {project.subtitle && (
              <p className="text-xl text-muted-foreground leading-snug">{project.subtitle}</p>
            )}
          </div>

          {project.short_description && (
            <p className="text-body-lg text-muted-foreground leading-relaxed max-w-[60ch]">
              {project.short_description}
            </p>
          )}

          <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            {project.category && (
              <div>
                <span className="text-muted-foreground text-xs">Category</span>
                <p className="font-medium mt-0.5">{project.category}</p>
              </div>
            )}
            {project.year && (
              <div>
                <span className="text-muted-foreground text-xs">Year</span>
                <p className="font-medium mt-0.5">{project.year}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
