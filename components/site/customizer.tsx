"use client";

import * as React from "react";
import { GarmentPreview, type GarmentKind } from "@/components/ui/product-rail-gallery";
import { ADULT, KIDS, SIZES, eur } from "@/lib/pricing";
import { estimate } from "@/lib/estimate";
import logo from "@/assets/logo-mark.webp";
import { CONTACT } from "@/lib/contact";
import { COLORS, PHOTOS, isDark, placePhoto, type PhotoSpec } from "@/lib/photos";
import type { Idea } from "@/lib/ideas";

const PIECES = [...ADULT, ...KIDS];
const ART: Record<string, GarmentKind> = {
  tshirt: "tee", oversize: "tee", manga: "knit", sweat: "knit", capuz: "hoodie",
  body: "tee", sweatbebe: "knit", tshirtk: "tee", sweatk: "knit", capuzk: "hoodie",
};

// Peças ilustradas: 1 unidade ≈ 0,48 cm (o peito tem cerca de 100 unidades)
const BOX = [{ w: 21, h: 21 }, { w: 44, h: 63 }, { w: 59, h: 74 }];
const ILL_CM = 2.1;
// Máximos de cada tamanho (largura × altura, em cm) — é o que define o preço
const TIER = [[10, 10], [21, 30], [28, 35]];
const CM = ["10 × 10 cm", "21 × 30 cm", "28 × 35 cm"];

type Side = "front" | "back";
type Design = {
  img: string | null;
  text: string;
  /** altura / largura do desenho */
  ar: number;
  /** largura em cm */
  wcm: number;
  /** centro na peça (null = posição automática) */
  pos: { x: number; y: number } | null;
};

const LOGO_AR = logo.height / logo.width;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const textAr = (t: string) => clamp(1.9 / Math.max(t.trim().length, 1), 0.12, 1.2);
const fitW = (tier: number, ar: number) => Math.min(TIER[tier][0], TIER[tier][1] / ar);
const maxWFor = (pieceId: string, ar: number) => Math.min(PHOTOS[pieceId]?.maxW ?? 28, 28, 35 / ar);
const tierOf = (w: number, h: number) => {
  const i = TIER.findIndex(([tw, th]) => w <= tw + 0.01 && h <= th + 0.01);
  return i < 0 ? 2 : i;
};
const blank = (pieceId: string, tier: number): Design => ({ img: null, text: "", ar: 1, wcm: clamp(fitW(tier, 1), 4, maxWFor(pieceId, 1)), pos: null });
const withTier = (pieceId: string, d: Design, tier: number): Design => ({ ...d, pos: null, wcm: clamp(fitW(tier, d.ar), 4, maxWFor(pieceId, d.ar)) });
const startTier = (pieceId: string) => PHOTOS[pieceId]?.defaultSize ?? 1;

function place(side: Side, size: number) {
  const { w, h } = BOX[size];
  if (side === "front") return size === 0 ? { x: 124 - w / 2, y: 78, w, h } : { x: 100 - w / 2, y: size === 1 ? 74 : 70, w, h };
  return { x: 100 - w / 2, y: 66 - size * 3, w, h };
}
function anchor(spec: PhotoSpec | undefined, side: Side, tier: number) {
  const b = spec ? placePhoto(spec, side, tier) : place(side, tier);
  return { x: b.x + b.w / 2, y: b.y + b.h / 2 };
}

export function Customizer() {
  const [pieceId, setPieceId] = React.useState("tshirt");
  const [color, setColor] = React.useState(COLORS[2]);
  const [side, setSide] = React.useState<Side>("front");
  const [design, setDesign] = React.useState<Record<Side, Design>>(() => ({
    front: { img: logo.src, text: "", ar: LOGO_AR, wcm: fitW(1, LOGO_AR), pos: null },
    back: blank("tshirt", 1),
  }));
  const [qty, setQty] = React.useState(1);
  const [nameX, setNameX] = React.useState(false);
  const [photo, setPhoto] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [dragging, setDragging] = React.useState(false);
  const urls = React.useRef<string[]>([]);
  const drag = React.useRef<{ x: number; y: number; px: number; py: number; k: number } | null>(null);
  React.useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);

  React.useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<Idea>).detail;
      const c = COLORS.find((x) => x.name === d.color);
      if (!c) return;
      const mk = (): Design => ({ img: null, text: d.text, ar: textAr(d.text), wcm: 0, pos: null });
      const t = mk(); t.wcm = clamp(fitW(d.size, t.ar), 4, maxWFor(d.piece, t.ar));
      setPieceId(d.piece); setColor(c); setSide(d.side); setQty(1); setNameX(false); setPhoto(false);
      setDesign({ front: d.side === "front" ? t : blank(d.piece, d.size), back: d.side === "back" ? t : blank(d.piece, d.size) });
    };
    window.addEventListener("idea-pick", on);
    const onRail = (e: Event) => {
      const d = (e as CustomEvent<{ id: string; variant?: string }>).detail;
      if (!PIECES.some((p) => p.id === d.id)) return;
      const c = COLORS.find((x) => x.name === d.variant);
      const t = startTier(d.id);
      setPieceId(d.id); if (c) setColor(c); setSide("front"); setQty(1); setNameX(false); setPhoto(false);
      setDesign({ front: { img: logo.src, text: "", ar: LOGO_AR, wcm: clamp(fitW(t, LOGO_AR), 4, maxWFor(d.id, LOGO_AR)), pos: null }, back: blank(d.id, t) });
    };
    window.addEventListener("rail-pick", onRail);
    return () => { window.removeEventListener("idea-pick", on); window.removeEventListener("rail-pick", onRail); };
  }, []);

  const piece = PIECES.find((p) => p.id === pieceId)!;
  const spec = PHOTOS[pieceId];
  const photoMode = !!spec;
  const V = spec ? { w: spec.w, h: spec.h, cm: spec.cm } : { w: 200, h: 310, cm: ILL_CM };
  const cur = design[side];
  const has = (s: Side) => !!(design[s].img || design[s].text.trim());
  const patch = (s: Side, d: Partial<Design>) => setDesign((o) => ({ ...o, [s]: { ...o[s], ...d } }));
  const dims = (d: Design) => ({ w: d.wcm, h: d.wcm * d.ar });
  const tierFor = (s: Side) => { const x = dims(design[s]); return tierOf(x.w, x.h); };
  const both = has("front") && has("back");
  const primaryTier = has("front") ? tierFor("front") : has("back") ? tierFor("back") : tierFor(side);
  const est = estimate(piece, { sizeIdx: primaryTier, qty, extra: both, nameX, photo });

  const { w: wcm, h: hcm } = dims(cur);
  const wpx = wcm * V.cm, hpx = hcm * V.cm;
  const tier = tierOf(wcm, hcm);
  const a = anchor(spec, side, tier);
  const cx = cur.pos?.x ?? a.x, cy = cur.pos?.y ?? a.y;
  const ink = isDark(color.hex) ? "#fbf7ec" : "#2a211b";
  const maxW = maxWFor(pieceId, cur.ar);
  const txt = cur.text.trim();

  function down(e: React.PointerEvent<HTMLDivElement>) {
    const box = e.currentTarget.parentElement;
    if (!box) return;
    const r = box.getBoundingClientRect();
    drag.current = { x: e.clientX, y: e.clientY, px: cx, py: cy, k: V.w / r.width };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  }
  function move(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    patch(side, { pos: { x: clamp(d.px + (e.clientX - d.x) * d.k, 0, V.w), y: clamp(d.py + (e.clientY - d.y) * d.k, 0, V.h) } });
  }
  function up() {
    drag.current = null;
    setDragging(false);
  }
  function keys(e: React.KeyboardEvent<HTMLDivElement>) {
    const step = (e.shiftKey ? 0.05 : 0.015) * V.w;
    const m: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const v = m[e.key];
    if (!v) return;
    e.preventDefault();
    patch(side, { pos: { x: clamp(cx + v[0], 0, V.w), y: clamp(cy + v[1], 0, V.h) } });
  }

  const content = cur.img ? (
    <image href={cur.img} x={cx - wpx / 2} y={cy - hpx / 2} width={wpx} height={hpx} preserveAspectRatio="xMidYMid meet" pointerEvents="none" />
  ) : txt ? (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={wpx / (Math.max(txt.length, 1) * 0.6)} textLength={wpx} lengthAdjust="spacingAndGlyphs" fontWeight="700" fill={ink} fontFamily="Georgia, serif" pointerEvents="none">{txt}</text>
  ) : null;
  const overlay = <g>{content}</g>;
  const handle = (
    <div
      role="button" tabIndex={0} aria-label="Desenho: arrasta ou usa as setas para o mover"
      className={`absolute touch-none select-none rounded-sm outline-none before:absolute before:-inset-3 before:content-[''] focus-visible:border focus-visible:border-dashed focus-visible:border-foreground/70 ${content ? (dragging ? "border border-dashed border-foreground/70" : "border border-transparent hover:border-dashed hover:border-foreground/50") : "border border-dashed border-foreground/60"}`}
      style={{ left: `${((cx - wpx / 2) / V.w) * 100}%`, top: `${((cy - hpx / 2) / V.h) * 100}%`, width: `${(wpx / V.w) * 100}%`, height: `${(hpx / V.h) * 100}%`, cursor: dragging ? "grabbing" : "grab" }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onKeyDown={keys}
    />
  );

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    urls.current.push(url);
    const im = new Image();
    im.onload = () => {
      const ar = im.naturalHeight / Math.max(im.naturalWidth, 1);
      setDesign((o) => ({ ...o, [side]: { ...o[side], img: url, text: "", ar, pos: null, wcm: clamp(fitW(startTier(pieceId), ar), 4, maxWFor(pieceId, ar)) } }));
    };
    im.src = url;
    e.target.value = "";
  }
  function onText(v: string) {
    const ar = v.trim() ? textAr(v) : 1;
    setDesign((o) => {
      const d = o[side];
      return { ...o, [side]: { ...d, text: v, img: v.trim() ? null : d.img, ar, wcm: clamp(d.img || d.text.trim() ? d.wcm : fitW(startTier(pieceId), ar), 4, maxWFor(pieceId, ar)) } };
    });
  }
  const preset = (t: number) => patch(side, { pos: null, wcm: clamp(fitW(t, cur.ar), 4, maxW) });
  const changePiece = (id: string) => {
    setPieceId(id);
    const t = startTier(id);
    setDesign((o) => ({ front: withTier(id, o.front, t), back: withTier(id, o.back, t) }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const part = (s: Side) => {
      if (!has(s)) return null;
      const x = dims(design[s]);
      const t = design[s].text.trim();
      return `${s === "front" ? "frente" : "costas"} (${x.w.toFixed(0)}×${x.h.toFixed(0)} cm${t ? `, texto "${t}"` : ""}${design[s].img ? ", com imagem" : ""})`;
    };
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
            <div style={{ aspectRatio: `${spec.w} / ${spec.h}` }} className="relative mx-auto w-full max-w-[22rem] drop-shadow-[0_18px_14px_rgba(0,0,0,0.2)]">
              <img src={spec.images[color.name]} alt={`${piece.name} ${color.name.toLowerCase()}`} draggable={false} className="absolute inset-0 size-full select-none" />
              <svg aria-hidden="true" viewBox={`0 0 ${spec.w} ${spec.h}`} className="pointer-events-none absolute inset-0 size-full overflow-visible">{overlay}</svg>
              {handle}
            </div>
          ) : (
            <GarmentPreview kind={ART[pieceId]} side={side} color={color.hex} html={handle} className="mx-auto -mb-[28%] w-full max-w-[19rem] drop-shadow-[0_18px_14px_rgba(0,0,0,0.18)]">
              {overlay}
            </GarmentPreview>
          )}
          <p className="mt-4 text-center text-xs text-muted-foreground">{cur.img === logo.src ? "Desenho de exemplo (o nosso símbolo): escolhe a tua imagem. " : ""}{photoMode && side === "back" ? "Costas: mesmo corte da peça. " : ""}Pré-visualização ilustrativa. Enviamos a prova real antes de pagares.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <label className="grid gap-1.5 text-sm font-medium">Peça
          <select className={field} value={pieceId} onChange={(e) => changePiece(e.target.value)}>
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
                {(cur.img || cur.text) && <button type="button" onClick={() => patch(side, { img: null, text: "", ar: 1, pos: null })} className={chip(false)}>Limpar</button>}
              </div>
              <input className={field} placeholder="ou escreve um nome ou texto" maxLength={24} value={cur.text} onChange={(e) => onText(e.target.value)} aria-label="Texto" />
            </div>

            <div className="grid gap-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium">Tamanho do desenho</span>
                <span className="text-xs tabular-nums text-muted-foreground">{wcm.toFixed(0)} × {hcm.toFixed(0)} cm · {SIZES[tier]}</span>
              </div>
              <input type="range" aria-label="Tamanho do desenho em centímetros" min={4} max={maxW} step={0.5} value={Math.min(wcm, maxW)} onChange={(e) => patch(side, { wcm: Number(e.target.value) })} className="w-full accent-[var(--color-foreground)]" />
              <div className="flex flex-wrap gap-2">
                {SIZES.map((name, i) => (
                  <button key={name} type="button" aria-pressed={tier === i} disabled={piece.prices.length > 1 && piece.prices[i] == null} onClick={() => preset(i)} className={`${chip(tier === i)} disabled:opacity-40`}>
                    {name} <span className="block text-[11px] opacity-70">{CM[i]}</span>
                  </button>
                ))}
                {cur.pos && <button type="button" onClick={() => patch(side, { pos: null })} className={chip(false)}>Centrar</button>}
              </div>
              <p className="text-xs text-muted-foreground">Arrasta o desenho na peça para o pôr onde quiseres. O preço segue o tamanho.</p>
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
