"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Backlight } from "./backlight";

type ProjectCardProps = {
  slug: string;
  title: string;
  subtitle: string | null;
  coverImage: string | null;
  index?: number;
};

export function ProjectCard({ slug, title, subtitle, coverImage, index = 0 }: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/work/${slug}`} className="block">
        <Backlight>
          <div className="group relative flex flex-col overflow-hidden rounded-[10px] border border-border bg-card text-card-foreground transition-all hover:scale-[1.01]">
            <div className="relative aspect-4/3 overflow-hidden rounded-[10px] bg-muted">
              {coverImage ? (
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                  {title.charAt(0)}
                </div>
              )}
            </div>
            <div className="px-1 pb-1 pt-4 space-y-1.5">
              <h3 className="text-lg font-semibold leading-snug tracking-tight">{title}</h3>
              {subtitle && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-[42ch]">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </Backlight>
      </Link>
    </motion.div>
  );
}
