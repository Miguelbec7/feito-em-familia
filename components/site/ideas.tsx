"use client";

import { COLORS, PHOTOS, isDark, placePhoto, plainSrc } from "@/lib/photos";
import { IDEAS, type Idea } from "@/lib/ideas";
import { ADULT, KIDS, eur } from "@/lib/pricing";

const PIECES = [...ADULT, ...KIDS];

function IdeaCard({ idea }: { idea: Idea }) {
  const spec = PHOTOS[idea.piece];
  const color = COLORS.find((c) => c.name === idea.color)!;
  const piece = PIECES.find((p) => p.id === idea.piece)!;
  const box = placePhoto(spec, idea.side, idea.size);
  const fs = Math.max(6, Math.min(box.h * 0.45, (box.w / Math.max(idea.text.length, 1)) * 1.7));
  const price = piece.prices.length === 1 ? piece.prices[0] : piece.prices[idea.size];

  const pick = () => {
    window.dispatchEvent(new CustomEvent("idea-pick", { detail: idea }));
    document.getElementById("personaliza")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
      <div className="relative bg-muted px-6 pb-4 pt-6">
        {idea.side === "back" && <span className="absolute left-4 top-4 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium">Nas costas</span>}
        <div style={{ aspectRatio: `${spec.w} / ${spec.h}` }} className="relative mx-auto w-full max-w-[15rem] drop-shadow-[0_14px_10px_rgba(0,0,0,0.16)]">
          <img src={plainSrc(idea.piece, idea.color, idea.side)} alt={`${piece.name} ${idea.color.toLowerCase()} com o texto ${idea.text}`} loading="lazy" draggable={false} className="absolute inset-0 size-full select-none" />
          <svg aria-hidden="true" viewBox={`0 0 ${spec.w} ${spec.h}`} className="absolute inset-0 size-full overflow-visible">
            <text x={box.x + box.w / 2} y={box.y + box.h / 2} textAnchor="middle" dominantBaseline="central" fontSize={fs} fontWeight="700" fill={isDark(color.hex) ? "#fbf7ec" : "#2a211b"} fontFamily="Georgia, serif">{idea.text}</text>
          </svg>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-medium">{idea.title}</h3>
        <p className="text-sm text-muted-foreground">{idea.blurb}</p>
        <p className="mt-1 text-xs text-muted-foreground">{piece.name} · {idea.color} · {eur(price ?? 0)}</p>
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
