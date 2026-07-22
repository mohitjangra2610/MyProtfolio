import { Button } from "@/components/ui/button";
import { HeroText } from "@/components/ui/hero-text";
import { ProjectCard } from "@/components/ui/project-card";
import { SparklesText } from "@/components/ui/sparkles-text";
import { WordRotate } from "@/components/ui/word-rotate";
import { supabase } from "@/lib/supabase";
import PageContainer from "./PageContainer";

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, title, subtitle, thumbnail")
    .eq("featured", true)
    .eq("status", "published")
    .order("featured_order")
    .limit(3);

  return (
    <PageContainer>
      <section className="grid lg:grid-cols-2 gap-16 lg:gap-24 justify-center pt-20 lg:pt-24 pb-16 lg:pb-20">
        <div className="flex flex-col gap-y-12">
          <div className="space-y-4">
            <SparklesText className="text-xl font-medium">
              <WordRotate
                words={["Product Design", "UX Strategy", "Design Systems", "System Thinking"]}
              />
            </SparklesText>
            <HeroText />
          </div>

          <div className="max-w-xl space-y-4">
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Transforming complexity into clarity through product design, systems thinking, and
              strategy. Creating experiences that are intuitive, effective, and scalable.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg">View My Work</Button>
            <Button variant="outline" size="lg">
              How I Work
            </Button>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <video
            autoPlay
            muted
            playsInline
            loop={true}
            className="aspect-video w-full rounded-lg object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="space-y-3 mb-14">
          <h2 className="text-3xl font-bold tracking-tight">Selected Work</h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            A collection of projects where product design helped transform complexity into clear,
            scalable user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects?.map((project, i) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              subtitle={project.subtitle}
              coverImage={project.thumbnail}
              index={i}
            />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
