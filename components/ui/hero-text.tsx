import { DiaTextReveal } from "./dia-text-reveal";

export function HeroText() {
  return (
    <div className="flex w-full items-center justify-start">
      <DiaTextReveal
        className="text-4xl font-bold tracking-tight"
        colors={["#22d3ee", "#818cf8", "#f472b6", "#34d399"]}
        text="Designing Complex Systems Into Clear, Scalable Experiences"
      />
    </div>
  );
}
