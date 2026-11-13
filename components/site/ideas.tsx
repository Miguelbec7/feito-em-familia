"use client";

import { IDEAS, type Idea } from "@/lib/ideas";
import { ADULT, KIDS, eur } from "@/lib/pricing";

const PIECES = [...ADULT, ...KIDS];

function IdeaCard({ idea }: { idea: Idea }) {
  const piece = PIECES.find((p) => p.id === idea.piece)!;
  const from = Math.min(...piece.prices.filter((v): v is number => v != null));

  const pick = () => {
    window.dispatchEvent(new CustomEvent("idea-pick", { detail: idea }));
    document.getElementById("personaliza")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
      <img src={idea.image} alt={`${idea.title}: ${piece.name.toLowerCase()} ${idea.color.toLowerCase()} com o desenho`} loading="lazy" draggable={false} className="aspect-square w-full bg-muted object-cover" />
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-medium">{idea.title}</h3>
        <p className="text-sm text-muted-foreground">{idea.blurb}</p>
        <p className="mt-1 text-xs text-muted-foreground">{piece.name} · {idea.color} · desde&nbsp;{eur(from).replace(" ", "\u00a0")}</p>
        <button type="button" onClick={pick} className="mt-3 self-start rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card">
          Quero uma assim
        </button>
      </div>
    </article>
  );
}

export function Ideas() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {IDEAS.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
    </div>
  );
}
