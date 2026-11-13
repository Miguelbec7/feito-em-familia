"use client";

import * as React from "react";
import { ADULT, KIDS, MUGS, PRESENTS, SIZES, eur, type Piece } from "@/lib/pricing";
import { CONTACT } from "@/lib/contact";

const GROUPS: [string, Piece[]][] = [["Adulto", ADULT], ["Bebé e criança", KIDS], ["Canecas", MUGS], ["Presentes", PRESENTS]];
const ALL = GROUPS.flatMap(([, items]) => items);
const field = "w-full rounded-xl border border-border bg-background px-3.5 py-3 text-base sm:py-2.5 sm:text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";

export function Calculator() {
  const [id, setId] = React.useState("tshirt");
  const [sizeIdx, setSizeIdx] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [extra, setExtra] = React.useState(false);
  const [nameX, setNameX] = React.useState(false);
  const [photo, setPhoto] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    const on = (e: Event) => {
      const pick = (e as CustomEvent<string>).detail;
      if (!ALL.some((p) => p.id === pick)) return;
      setId(pick); setSizeIdx(0); setExtra(false); setNameX(false); setPhoto(false);
    };
    window.addEventListener("pick-piece", on);
    return () => window.removeEventListener("pick-piece", on);
  }, []);

  const piece = ALL.find((p) => p.id === id)!;
  const single = piece.prices.length === 1;
  const idx = single ? 0 : piece.prices[sizeIdx] != null ? sizeIdx : piece.prices.findIndex((v) => v != null);
  const noExtras = !!(piece.mug || piece.flat);
  const canPhoto = !noExtras && piece.photo !== "—";
  const n = Math.max(1, Math.min(500, qty || 1));

  let unit = piece.prices[idx] ?? 0;
  let hint = "";
  if (piece.mug && n >= 10) { unit = 7.9; hint = "Preço de grupo aplicado (10 ou mais)."; }
  else if (n >= 10 && piece.group) {
    const full = extra && nameX;
    unit = piece.group[full ? 0 : 1];
    hint = full ? "Preço de grupo: frente + costas + nome." : "Preço de grupo: só frente. Marca desenho extra e nome para frente + costas + nome.";
  } else {
    if (extra && !noExtras) unit += piece.kid ? 4 : 5;
    if (nameX && !noExtras) unit += 2;
    if (photo && canPhoto) unit += 2;
    if (n >= 10 && !noExtras) hint = "Para 10 ou mais peças, pede-nos o preço de grupo.";
  }
  const total = unit * n;

  function message() {
    const bits = [`Olá! Gostava de pedir: ${n}× ${piece.name}`];
    if (!single) bits.push(`desenho ${SIZES[idx].toLowerCase()}`);
    const ex = [extra && "desenho extra", nameX && "nome", photo && canPhoto && "a partir de fotografia"].filter(Boolean);
    if (ex.length && !noExtras) bits.push(ex.join(", "));
    return `${bits.join(", ")}. Estimativa: ${eur(total)}.`;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = message();
    if (CONTACT.whatsapp) { window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener"); setMsg(""); return; }
    try { await navigator.clipboard.writeText(text); setMsg("Pedido copiado. Cola-o numa mensagem para nós."); } catch { setMsg(text); }
  }

  const check = "flex items-center gap-3 py-1.5 text-sm";
  return (
    <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <label className="grid gap-1.5 text-sm font-medium">Peça
        <select className={field} value={id} onChange={(e) => { setId(e.target.value); setSizeIdx(0); setExtra(false); setNameX(false); setPhoto(false); }}>
          {GROUPS.map(([g, items]) => <optgroup key={g} label={g}>{items.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</optgroup>)}
        </select>
      </label>
      <div className="grid grid-cols-[1fr_7rem] gap-4">
        <label className="grid gap-1.5 text-sm font-medium">Tamanho do desenho
          <select className={field} disabled={single} value={idx} onChange={(e) => setSizeIdx(Number(e.target.value))}>
            {single ? <option value={0}>Tamanho único</option> : SIZES.map((s, i) => <option key={s} value={i} disabled={piece.prices[i] == null}>{s}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">Quantidade
          <input className={field} type="number" min={1} max={500} inputMode="numeric" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
        </label>
      </div>
      <fieldset disabled={noExtras} className="grid gap-3 disabled:opacity-50">
        <legend className="mb-2 text-sm font-medium">Extras</legend>
        <label className={check}><input type="checkbox" className="size-5 accent-foreground" checked={extra} onChange={(e) => setExtra(e.target.checked)} /> Desenho extra (frente e costas)</label>
        <label className={check}><input type="checkbox" className="size-5 accent-foreground" checked={nameX} onChange={(e) => setNameX(e.target.checked)} /> Nome nas costas ou na manga (+2 €)</label>
        <label className={check}><input type="checkbox" className="size-5 accent-foreground" disabled={!canPhoto} checked={photo && canPhoto} onChange={(e) => setPhoto(e.target.checked)} /> Desenho feito a partir de fotografia (+2 €)</label>
      </fieldset>
      <div aria-live="polite" className="rounded-xl bg-muted px-5 py-4">
        <div className="flex items-baseline justify-between"><span className="text-sm text-muted-foreground">Estimativa</span><b className="text-3xl font-medium tracking-tight tabular-nums">{eur(total)}</b></div>
        <p className="mt-1 min-h-[1.25rem] text-xs text-muted-foreground">{hint || (n > 1 ? `${eur(unit)} por peça.` : "")}</p>
      </div>
      <button type="submit" className="rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-background outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        {CONTACT.whatsapp ? "Enviar pedido por WhatsApp" : "Copiar o meu pedido"}
      </button>
      <p role="status" className="min-h-[1.25rem] text-sm text-muted-foreground">{msg}</p>
    </form>
  );
}
