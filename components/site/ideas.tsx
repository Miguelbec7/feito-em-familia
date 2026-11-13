"use client";

import * as React from "react";
import { IDEAS, type Idea } from "@/lib/ideas";
import { ADULT, KIDS, eur } from "@/lib/pricing";
import { CONTACT } from "@/lib/contact";

const PIECES = [...ADULT, ...KIDS];
const FIRST = 6;
const primary = "rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card";
const secondary = "rounded-full border border-border px-5 py-3 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring";
const field = "w-full rounded-xl border border-border bg-background px-3.5 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm";

const pieceOf = (idea: Idea) => PIECES.find((p) => p.id === idea.piece)!;
const fromPrice = (idea: Idea) => Math.min(...pieceOf(idea).prices.filter((v): v is number => v != null));

function IdeaCard({ idea, onPick }: { idea: Idea; onPick: (i: Idea) => void }) {
  const piece = pieceOf(idea);
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
      <img src={idea.image} alt={`${idea.title}: ${piece.name.toLowerCase()} ${idea.color.toLowerCase()} com o desenho`} loading="lazy" draggable={false} className="aspect-square w-full bg-muted object-cover" />
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-medium">{idea.title}</h3>
        <p className="text-sm text-muted-foreground">{idea.blurb}</p>
        <p className="mt-1 text-xs text-muted-foreground">{piece.name} · {idea.color} · desde&nbsp;{eur(fromPrice(idea)).replace(" ", " ")}</p>
        <button type="button" onClick={() => onPick(idea)} className={`mt-3 self-start ${primary}`}>Quero uma assim</button>
      </div>
    </article>
  );
}

function OrderDialog({ idea, onClose }: { idea: Idea; onClose: () => void }) {
  const [what, setWhat] = React.useState("");
  const [size, setSize] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const box = React.useRef<HTMLDivElement>(null);
  const piece = pieceOf(idea);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = prev; };
  }, []);

  const text = [
    `Olá! Gostei da ideia «${idea.title}» (${piece.name}, ${idea.color.toLowerCase()}, desde ${eur(fromPrice(idea))}).`,
    what.trim() ? `Nome / alterações: ${what.trim()}` : "Nome / alterações: (digo a seguir)",
    size.trim() ? `Tamanho e quantidade: ${size.trim()}` : "",
  ].filter(Boolean).join("\n");

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
    if (e.key !== "Tab") return;
    const c = [...(box.current?.querySelectorAll<HTMLElement>("button, a, textarea, input") ?? [])].filter((n) => !(n as HTMLButtonElement).disabled);
    const first = c[0], last = c.at(-1);
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  async function copy(open?: "ig") {
    try { await navigator.clipboard.writeText(text); setMsg(open === "ig" ? "Mensagem copiada. Cola-a na conversa do Instagram que se abriu." : "Mensagem copiada. Já podes colar onde quiseres."); }
    catch { setMsg("Não consegui copiar automaticamente. Seleciona o texto abaixo e copia."); }
    if (open === "ig") window.open(`https://ig.me/m/${CONTACT.instagram}`, "_blank", "noopener");
  }
  const goConfigurator = () => {
    window.dispatchEvent(new CustomEvent("idea-pick", { detail: idea }));
    onClose();
    window.setTimeout(() => document.getElementById("personaliza")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="idea-dlg-title" className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" onKeyDown={onKey}>
      <div aria-hidden="true" className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div ref={box} className="relative flex max-h-[92svh] w-full max-w-lg flex-col gap-5 overflow-y-auto rounded-t-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl sm:rounded-3xl">
        <button type="button" onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 grid size-11 place-items-center rounded-full text-xl leading-none text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">×</button>
        <div className="flex items-center gap-4 pr-10">
          <img src={idea.image} alt="" className="size-20 shrink-0 rounded-xl bg-muted object-cover" />
          <div>
            <h3 id="idea-dlg-title" className="font-medium">{idea.title}</h3>
            <p className="text-xs text-muted-foreground">{piece.name} · {idea.color} · desde&nbsp;{eur(fromPrice(idea)).replace(" ", " ")}</p>
          </div>
        </div>

        <label className="grid gap-1.5 text-sm font-medium">Qual é o nome, ou o que queres mudar?
          <textarea ref={ref} rows={3} value={what} onChange={(e) => setWhat(e.target.value)} placeholder="Ex.: Sofia, com o desenho do gatinho" className={`${field} resize-none`} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">Tamanho e quantidade <span className="font-normal text-muted-foreground">(opcional)</span>
          <input value={size} onChange={(e) => setSize(e.target.value)} placeholder="Ex.: 6 anos, 1 peça" className={field} />
        </label>

        <div className="grid gap-2">
          {CONTACT.whatsapp && <a href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener" className={`${primary} text-center`}>Enviar por WhatsApp</a>}
          {CONTACT.instagram && <button type="button" onClick={() => copy("ig")} className={CONTACT.whatsapp ? secondary : primary}>Copiar e abrir o Instagram</button>}
          <button type="button" onClick={() => copy()} className={CONTACT.whatsapp || CONTACT.instagram ? secondary : primary}>Copiar mensagem</button>
        </div>
        <p role="status" className="min-h-[1.25rem] text-sm text-muted-foreground">{msg || "Pedido sem compromisso: enviamos uma prova antes de pagares."}</p>
        <button type="button" onClick={goConfigurator} className="self-center text-xs text-muted-foreground underline underline-offset-4 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">Prefiro ajustar a peça no configurador</button>
      </div>
    </div>
  );
}

export function Ideas() {
  const [all, setAll] = React.useState(false);
  const [open, setOpen] = React.useState<Idea | null>(null);
  const trigger = React.useRef<HTMLElement | null>(null);
  const list = all ? IDEAS : IDEAS.slice(0, FIRST);
  const pick = (i: Idea) => { trigger.current = document.activeElement as HTMLElement; setOpen(i); };
  const close = () => { setOpen(null); window.setTimeout(() => trigger.current?.focus({ preventScroll: true }), 0); };
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((idea) => <IdeaCard key={idea.id} idea={idea} onPick={pick} />)}
      </div>
      {IDEAS.length > FIRST && (
        <div className="mt-8 flex justify-center">
          <button type="button" aria-expanded={all} onClick={() => setAll((v) => !v)} className={secondary}>
            {all ? "Ver menos ideias" : `Ver mais ideias (${IDEAS.length - FIRST})`}
          </button>
        </div>
      )}
      {open && <OrderDialog idea={open} onClose={close} />}
    </>
  );
}
