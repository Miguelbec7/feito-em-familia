"use client";

import * as React from "react";
import { SHELVES, type ShelfItem } from "@/lib/pricing";

function shade(c: string, pct: number) {
  return `color-mix(in oklab, ${c} ${100 - Math.abs(pct)}%, ${pct > 0 ? "white" : "black"})`;
}

function MugBody({ color, art, magic }: { color: string; art?: ShelfItem["art"]; magic?: boolean }) {
  const ink = magic ? "#fff" : "#2b2b2b";
  return (
    <>
      <path d="M92,40 C118,40 118,88 92,88" fill="none" stroke={shade(color, -18)} strokeWidth="9" strokeLinecap="round" />
      <path d="M92,40 C118,40 118,88 92,88" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" transform="translate(-1 -1)" />
      <rect x="20" y="18" width="74" height="92" rx="9" fill={color} />
      <rect x="20" y="18" width="74" height="92" rx="9" fill="url(#mug-vol)" />
      <ellipse cx="57" cy="18" rx="37" ry="7" fill={shade(color, -22)} />
      <ellipse cx="57" cy="18.5" rx="33" ry="5" fill={magic ? "#000" : shade(color, -45)} />
      {art === "nome" && <text x="57" y="72" textAnchor="middle" fontSize="22" fontWeight="600" fill={ink} fontFamily="Georgia, serif">Ana</text>}
      {art === "foto" && (
        <g>
          <rect x="33" y="40" width="48" height="44" rx="4" fill="#fff" />
          <rect x="37" y="44" width="40" height="30" fill="#A3D3EB" />
          <circle cx="66" cy="53" r="4.5" fill="#F2B134" />
          <path d="M37,74 L50,58 L58,67 L64,61 L77,74 Z" fill="#185B37" />
        </g>
      )}
      {art === "design" && (
        <g fill="#fff" fillOpacity="0.9">
          {[0, 1, 2].flatMap((r) => [0, 1].map((c) => (
            <path key={`${r}${c}`} transform={`translate(${34 + c * 26 + (r % 2) * 8} ${40 + r * 22}) scale(0.9)`} d="M8,14 C-4,5 2,-3 8,3 C14,-3 20,5 8,14 Z" />
          )))}
        </g>
      )}
      {magic && <path transform="translate(40 50) scale(1.4)" d="M8,14 C-4,5 2,-3 8,3 C14,-3 20,5 8,14 Z" fill="#E8573D" />}
    </>
  );
}

function Keychain({ color, x = 0, y = 0, s = 1 }: { color: string; x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="60" cy="14" r="9" fill="none" stroke="#9aa0a6" strokeWidth="3" />
      <rect x="57" y="22" width="6" height="8" rx="1.5" fill="#9aa0a6" />
      <rect x="36" y="30" width="48" height="58" rx="7" fill="#fff" stroke="#00000018" />
      <rect x="40" y="34" width="40" height="50" rx="4" fill={color} />
      <circle cx="60" cy="52" r="8" fill="#fff" fillOpacity="0.85" />
      <path d="M44,84 C46,68 74,68 76,84 Z" fill="#fff" fillOpacity="0.85" />
    </g>
  );
}

function Illustration({ item }: { item: ShelfItem }) {
  return (
    <svg viewBox="0 0 120 130" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="mug-vol" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.2" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="plate-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {(item.kind === "mug" || item.kind === "magic") && <MugBody color={item.color} art={item.art} magic={item.kind === "magic"} />}
      {item.kind === "keychain" && <Keychain color={item.color} y={24} />}
      {item.kind === "plate" && (
        <g transform={item.id === "g-placa2" ? "translate(2 17) scale(1.05)" : "translate(14 32) scale(0.9)"}>
          <rect x="6" y="6" width="100" height="84" rx="4" fill="#d9dde1" />
          <rect x="10" y="10" width="92" height="76" rx="2" fill={item.color} />
          <circle cx="82" cy="28" r="8" fill="#F2B134" />
          <path d="M10,86 L40,46 L58,66 L72,52 L102,86 Z" fill="#fff" fillOpacity="0.55" />
          <rect x="10" y="10" width="92" height="76" rx="2" fill="url(#plate-shine)" />
        </g>
      )}
      {item.kind === "combo" && (
        <g>
          <g transform="translate(-14 21) scale(0.82)"><MugBody color="#F2F0EA" art="foto" /></g>
          <Keychain color={item.color} x={50} y={48} s={0.72} />
        </g>
      )}
    </svg>
  );
}

function Piece({ item, selected, dim, onPick }: { item: ShelfItem; selected: boolean; dim: boolean; onPick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${item.name}, ${item.price}`}
      onClick={onPick}
      className={`group relative flex w-[22%] min-w-[4.5rem] max-w-[8.5rem] flex-col items-center outline-none transition-[transform,opacity] duration-300 motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-lg ${selected ? "-translate-y-3" : "hover:-translate-y-1.5"} ${dim ? "opacity-80" : ""}`}
    >
      <div className="aspect-[120/130] w-full drop-shadow-[0_10px_8px_rgba(0,0,0,0.18)]">
        {item.image ? <img src={item.image} alt="" draggable={false} className="size-full object-contain object-bottom" /> : <Illustration item={item} />}
      </div>
      <span aria-hidden="true" className={`absolute -top-6 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-medium tabular-nums shadow-sm transition-opacity ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>{item.price}</span>
    </button>
  );
}

export function ProductShelf() {
  const all = SHELVES.flatMap((s) => s.items);
  const [sel, setSel] = React.useState<string>(all[0].id);
  const item = all.find((i) => i.id === sel)!;

  const request = () => {
    window.dispatchEvent(new CustomEvent("pick-piece", { detail: item.pick }));
    document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
      <div className="rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted px-4 pb-6 pt-8 sm:px-8">
        {SHELVES.map((shelf) => (
          <div key={shelf.title} className="mb-8 last:mb-0">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">{shelf.title}</p>
            <div className="flex items-end justify-around gap-2 px-2">
              {shelf.items.map((it) => <Piece key={it.id} item={it} selected={it.id === sel} dim={it.id !== sel} onPick={() => setSel(it.id)} />)}
            </div>
            <div aria-hidden="true" className="relative -mx-2 h-3.5 rounded-sm bg-gradient-to-b from-foreground/25 to-foreground/10 shadow-[0_14px_14px_-8px_rgba(0,0,0,0.3)] sm:-mx-4">
              <span className="absolute inset-x-0 top-0 h-px bg-white/50" />
            </div>
          </div>
        ))}
      </div>

      <div aria-live="polite" className="flex flex-col gap-3 text-center lg:text-left">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          {String(all.findIndex((i) => i.id === sel) + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}
        </p>
        <h3 key={item.id} className="animate-in fade-in text-2xl font-medium tracking-tight [animation-duration:300ms] motion-reduce:animate-none">{item.name}</h3>
        {item.note && <p className="text-sm text-muted-foreground">{item.note}</p>}
        <p className="text-3xl font-medium tracking-tight tabular-nums">{item.price}</p>
        <button type="button" onClick={request} className="mt-2 self-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:self-start">
          Pedir este
        </button>
      </div>
    </div>
  );
}
