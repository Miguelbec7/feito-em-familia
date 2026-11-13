"use client";

import * as React from "react";
import { ADULT, KIDS, SIZES, eur } from "@/lib/pricing";

const th = "px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground";
const td = "px-5 py-3.5 tabular-nums";

export function PriceTabs() {
  const [tab, setTab] = React.useState<"adulto" | "crianca">("adulto");
  return (
    <div>
      <div role="tablist" aria-label="Tipo de roupa" className="mb-5 inline-flex rounded-full border border-border p-1">
        {([["adulto", "Adulto"], ["crianca", "Bebé e criança"]] as const).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${tab === id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        {tab === "adulto" ? (
          <table className="w-full min-w-[480px] text-sm">
            <thead><tr className="border-b border-border"><th className={th}>Peça</th>{SIZES.map((s) => <th key={s} className={th}>{s}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">
              {ADULT.map((p) => (
                <tr key={p.id}>
                  <th scope="row" className="px-5 py-3.5 text-left font-medium">{p.name}{p.note && <span className="block text-xs font-normal text-muted-foreground">{p.note}</span>}</th>
                  {p.prices.map((v, i) => <td key={i} className={`${td} ${v == null ? "text-muted-foreground" : ""}`}>{v == null ? "—" : eur(v)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full min-w-[480px] text-sm">
            <thead><tr className="border-b border-border"><th className={th}>Peça</th><th className={th}>Preço</th><th className={th}>Com fotografia</th></tr></thead>
            <tbody className="divide-y divide-border">
              {KIDS.map((p) => (
                <tr key={p.id}>
                  <th scope="row" className="px-5 py-3.5 text-left font-medium">{p.name}{p.note && <span className="block text-xs font-normal text-muted-foreground">{p.note}</span>}</th>
                  <td className={td}>{p.show}</td>
                  <td className={`${td} ${p.photo === "—" ? "text-muted-foreground" : ""}`}>{p.photo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
