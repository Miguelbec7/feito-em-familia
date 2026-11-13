"use client";

import * as React from "react";
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

const FIRST = 6;

export function Ideas() {
  const [all, setAll] = React.useState(false);
  const list = all ? IDEAS : IDEAS.slice(0, FIRST);
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
      </div>
      {IDEAS.length > FIRST && (
        <div className="mt-8 flex justify-center">
          <button type="button" aria-expanded={all} onClick={() => setAll((v) => !v)} className="rounded-full border border-border px-6 py-3 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
            {all ? "Ver menos ideias" : `Ver mais ideias (${IDEAS.length - FIRST})`}
          </button>
        </div>
      )}
    </>
  );
}
