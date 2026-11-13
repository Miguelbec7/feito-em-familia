"use client";

import * as React from "react";
import { GarmentPreview, type GarmentKind } from "@/components/ui/product-rail-gallery";
import { ADULT, KIDS, SIZES, eur } from "@/lib/pricing";
import { estimate } from "@/lib/estimate";
import logo from "@/assets/logo-mark.webp";
import { CONTACT } from "@/lib/contact";
import { SWEAT_PHOTO, SWEAT_RATIO } from "@/lib/sweat";

const PIECES = [...ADULT, ...KIDS];
const ART: Record<string, GarmentKind> = {
  tshirt: "tee", oversize: "tee", manga: "knit", sweat: "knit", capuz: "hoodie",
  body: "tee", sweatbebe: "knit", tshirtk: "tee", sweatk: "knit", capuzk: "hoodie",
};
const COLORS = [
  { name: "Branco", hex: "#F2EFE8" }, { name: "Preto", hex: "#1B1C1E" }, { name: "Azul-marinho", hex: "#1F2A44" },
  { name: "Cinzento", hex: "#9AA0A6" }, { name: "Vermelho", hex: "#B3362B" }, { name: "Verde", hex: "#2F5D3A" },
  { name: "Azul royal", hex: "#2D5DA8" }, { name: "Amarelo", hex: "#E5B73B" }, { name: "Rosa", hex: "#E8A5B8" }, { name: "Bege", hex: "#D8C7A8" },
];
// 1 unidade do desenho ≈ 0,5 cm na peça de adulto (o peito tem cerca de 100 unidades)
const BOX = [{ w: 21, h: 21 }, { w: 44, h: 63 }, { w: 59, h: 74 }];
const CM = ["10 × 10 cm", "21 × 30 cm", "28 × 35 cm"];

type Side = "front" | "back";
type Design = { img: string | null; text: string; size: number };
const empty = (size: number): Design => ({ img: null, text: "", size });

function place(side: Side, size: number) {
  const { w, h } = BOX[size];
  if (side === "front") return size === 0 ? { x: 124 - w / 2, y: 78, w, h } : { x: 100 - w / 2, y: size === 1 ? 74 : 70, w, h };
  return { x: 100 - w / 2, y: 66 - size * 3, w, h };
}
// Sweat em fotografia: o peito tem cerca de 190 px para ~56 cm (≈ 3,4 px/cm)
const PBOX = [{ w: 34, h: 34 }, { w: 71, h: 102 }, { w: 95, h: 119 }];
function placePhoto(side: Side, size: number) {
  const { w, h } = PBOX[size];
  if (side === "front") return size === 0 ? { x: 262 - w / 2, y: 92, w, h } : { x: 207 - w / 2, y: size === 1 ? 92 : 84, w, h };
  return { x: 207 - w / 2, y: 66 - size * 4, w, h };
}
function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 140;
}

export function Customizer() {
  const [pieceId, setPieceId] = React.useState("tshirt");
  const [color, setColor] = React.useState(COLORS[2]);
  const [side, setSide] = React.useState<Side>("front");
  const [design, setDesign] = React.useState<Record<Side, Design>>({ front: { img: logo.src, text: "", size: 1 }, back: empty(1) });
  const [qty, setQty] = React.useState(1);
  const [nameX, setNameX] = React.useState(false);
  const [photo, setPhoto] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const urls = React.useRef<string[]>([]);
  React.useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);

  const piece = PIECES.find((p) => p.id === pieceId)!;
  const cur = design[side];
  const has = (s: Side) => !!(design[s].img || design[s].text.trim());
  const patch = (s: Side, d: Partial<Design>) => setDesign((o) => ({ ...o, [s]: { ...o[s], ...d } }));
  const both = has("front") && has("back");
  const primary = has("front") ? design.front.size : has("back") ? design.back.size : cur.size;
  const est = estimate(piece, { sizeIdx: primary, qty, extra: both, nameX, photo });
  const photoMode = pieceId === "sweat";
  const box = photoMode ? placePhoto(side, cur.size) : place(side, cur.size);
  const ink = isDark(color.hex) ? "#fbf7ec" : "#2a211b";
  const fs = Math.max(6, Math.min(box.h * 0.45, (box.w / Math.max(cur.text.trim().length, 1)) * 1.7));
  const overlay = cur.img ? (
    <image href={cur.img} x={box.x} y={box.y} width={box.w} height={box.h} preserveAspectRatio="xMidYMid meet" />
  ) : cur.text.trim() ? (
    <text x={box.x + box.w / 2} y={box.y + box.h / 2} textAnchor="middle" dominantBaseline="central" fontSize={fs} fontWeight="700" fill={ink} fontFamily="Georgia, serif">{cur.text.trim()}</text>
  ) : (
    <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="2" fill="none" stroke={ink} strokeOpacity="0.55" strokeDasharray="3 2.5" strokeWidth="0.9" />
  );

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    urls.current.push(url);
    patch(side, { img: url });
    e.target.value = "";
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const part = (s: Side) => has(s) ? `${s === "front" ? "frente" : "costas"} (${CM[design[s].size]}${design[s].text.trim() ? `, texto "${design[s].text.trim()}"` : ""}${design[s].img ? ", com imagem" : ""})` : null;
    const where = [part("front"), part("back")].filter(Boolean).join(" e ");
    const text = `Olá! Quero ${est.n}× ${piece.name}, cor ${color.name}${where ? `, desenho na ${where}` : ""}${nameX ? ", com nome" : ""}${photo ? ", desenho a partir de fotografia" : ""}. Estimativa: ${eur(est.total)}. Vou enviar a imagem a seguir.`;
    if (CONTACT.whatsapp) { window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener"); setMsg(""); return; }
    try { await navigator.clipboard.writeText(text); setMsg("Pedido copiado. Cola-o numa mensagem para nós."); } catch { setMsg(text); }
  }

  const chip = (on: boolean) => `rounded-full border px-4 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${on ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-muted"}`;
  const field = "w-full rounded-xl border border-border bg-background px-3.5 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring sm:py-2.5 sm:text-sm";

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start">
      <div className="lg:sticky lg:top-20">
        <div className="rounded-3xl border border-border bg-muted p-6 sm:p-8">
          {photoMode ? (
            <div className="relative mx-auto aspect-[415/474] w-full max-w-[22rem] drop-shadow-[0_18px_14px_rgba(0,0,0,0.2)]">
              <img src={SWEAT_PHOTO[color.name]} alt={`Sweat ${color.name.toLowerCase()}`} draggable={false} className="absolute inset-0 size-full select-none" />
              <svg aria-hidden="true" viewBox={`0 0 ${SWEAT_RATIO.w} ${SWEAT_RATIO.h}`} className="absolute inset-0 size-full overflow-visible">{overlay}</svg>
            </div>
          ) : (
            <GarmentPreview kind={ART[pieceId]} side={side} color={color.hex} className="mx-auto -mb-[28%] w-full max-w-[19rem] drop-shadow-[0_18px_14px_rgba(0,0,0,0.18)]">
              {overlay}
            </GarmentPreview>
          )}
          <p className="mt-4 text-center text-xs text-muted-foreground">{cur.img === logo.src ? "Desenho de exemplo (o nosso símbolo): escolhe a tua imagem. " : ""}{photoMode && side === "back" ? "Costas: mesmo corte da peça. " : ""}Pré-visualização ilustrativa. Enviamos a prova real antes de pagares.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <label className="grid gap-1.5 text-sm font-medium">Peça
          <select className={field} value={pieceId} onChange={(e) => { setPieceId(e.target.value); const s = PIECES.find((p) => p.id === e.target.value)!; if (s.prices.length > 1 && s.prices[design.front.size] == null) { patch("front", { size: 1 }); patch("back", { size: 1 }); } }}>
            <optgroup label="Adulto">{ADULT.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</optgroup>
            <optgroup label="Bebé e criança">{KIDS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</optgroup>
          </select>
        </label>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Cor: <span className="font-normal text-muted-foreground">{color.name}</span></legend>
          <div className="flex flex-wrap gap-2.5">
            {COLORS.map((c) => (
              <button key={c.name} type="button" aria-label={c.name} aria-pressed={c.name === color.name} onClick={() => setColor(c)}
                className={`size-9 rounded-full border border-foreground/20 outline-none transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${c.name === color.name ? "scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-105"}`}
                style={{ background: c.hex }} />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">As cores dependem da disponibilidade.</p>
        </fieldset>

        <div>
          <div role="tablist" aria-label="Lado da peça" className="mb-4 inline-flex rounded-full border border-border p-1">
            {(["front", "back"] as const).map((s) => (
              <button key={s} type="button" role="tab" aria-selected={side === s} onClick={() => setSide(s)}
                className={`rounded-full px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring ${side === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                {s === "front" ? "Frente" : "Costas"}{has(s) && <span aria-hidden="true" className="ml-1.5 text-brand">●</span>}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <span className="text-sm font-medium">Desenho ({side === "front" ? "frente" : "costas"})</span>
              <div className="flex flex-wrap gap-2">
                <label className={`${chip(false)} cursor-pointer focus-within:ring-2 focus-within:ring-ring`}>
                  Escolher imagem
                  <input type="file" accept="image/*" onChange={onFile} className="sr-only" />
                </label>
                {(cur.img || cur.text) && <button type="button" onClick={() => patch(side, { img: null, text: "" })} className={chip(false)}>Limpar</button>}
              </div>
              <input className={field} placeholder="ou escreve um nome ou texto" maxLength={24} value={cur.text} onChange={(e) => patch(side, { text: e.target.value })} aria-label="Texto" />
            </div>

            <div className="grid gap-2">
              <span className="text-sm font-medium">Tamanho do desenho</span>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((name, i) => (
                  <button key={name} type="button" aria-pressed={cur.size === i} disabled={piece.prices.length > 1 && piece.prices[i] == null} onClick={() => patch(side, { size: i })} className={`${chip(cur.size === i)} disabled:opacity-40`}>
                    {name} <span className="block text-[11px] opacity-70">{CM[i]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_6.5rem] gap-4">
          <div className="grid gap-3 text-sm">
            <label className="flex items-center gap-3 py-1"><input type="checkbox" className="size-5 accent-foreground" checked={nameX} onChange={(e) => setNameX(e.target.checked)} /> Nome nas costas ou na manga (+2 €)</label>
            <label className="flex items-center gap-3 py-1"><input type="checkbox" className="size-5 accent-foreground" checked={photo && est.canPhoto} disabled={!est.canPhoto} onChange={(e) => setPhoto(e.target.checked)} /> Desenho feito a partir de fotografia (+2 €)</label>
          </div>
          <label className="grid gap-1.5 text-sm font-medium">Qtd.
            <input className={field} type="number" min={1} max={500} inputMode="numeric" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
          </label>
        </div>

        <div aria-live="polite" className="rounded-xl bg-muted px-5 py-4">
          <div className="flex items-baseline justify-between"><span className="text-sm text-muted-foreground">Estimativa</span><b className="text-3xl font-medium tracking-tight tabular-nums">{eur(est.total)}</b></div>
          <p className="mt-1 min-h-[1.25rem] text-xs text-muted-foreground">{est.hint || (both ? "Inclui desenho extra (frente e costas)." : est.n > 1 ? `${eur(est.unit)} por peça.` : "")}</p>
        </div>

        <button type="submit" className="rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-background outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          {CONTACT.whatsapp ? "Enviar pedido por WhatsApp" : "Copiar o meu pedido"}
        </button>
        <p role="status" className="min-h-[1.25rem] text-sm text-muted-foreground">{msg || "A imagem não é enviada pelo site: envias-nos o ficheiro na conversa."}</p>
      </div>
    </form>
  );
}
