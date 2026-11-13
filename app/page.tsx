import ClothingRailHero, { type RailGarment } from "@/components/ui/product-rail-gallery";
import { Header } from "@/components/site/header";
import { Section, card } from "@/components/site/section";
import { PriceTabs } from "@/components/site/price-tabs";
import { ProductShelf } from "@/components/site/product-shelf";
import { Calculator } from "@/components/site/calculator";
import { CONTACT } from "@/lib/contact";
import { EXTRAS, GROUP_TABLE, STEPS, XMAS } from "@/lib/pricing";

const RAIL: RailGarment[] = [
  { id: "tshirt", name: "T-shirt clássica", kind: "tee", color: "#EFEBE2", tag: "11,90 €", description: "Algodão 190 g com o teu desenho, nome ou fotografia.", details: ["Algodão 190 g", "11,90 · 14,90 · 16,90 €"] },
  { id: "oversize", name: "T-shirt oversize", kind: "tee", color: "#DE9C31", tag: "19,90 €", description: "Corte largo e descontraído.", details: ["Oversize", "19,90 · 22,90 · 26,90 €"] },
  { id: "manga", name: "Manga comprida", kind: "knit", color: "#B05139", tag: "14,90 €", description: "Para os dias mais frescos.", details: ["Manga comprida", "14,90 · 17,90 €"] },
  { id: "sweat", name: "Sweat sem capuz", kind: "knit", color: "#CCB2E0", tag: "24,90 €", description: "Ideal para equipas, escolas e festas.", details: ["24,90 · 29,90 · 34,90 €", "Preço de grupo desde 10"] },
  { id: "capuz", name: "Sweat com capuz", kind: "hoodie", color: "#A0A5AB", tag: "29,90 €", description: "A favorita para o Natal e para o Pack Família.", details: ["29,90 · 32,90 · 36,90 €"] },
  { id: "tshirtk", name: "T-shirt criança", kind: "tee", color: "#A3D3EB", tag: "10,90 €", description: "Também com a fotografia da criança.", details: ["10,90 · 12,90 · 14,90 €"] },
  { id: "capuzk", name: "Sweat criança com capuz", kind: "hoodie", color: "#185B37", tag: "24,90 €", description: "Combina com os adultos no Pack Família.", details: ["24,90 €"] },
];

const SIZE_CARDS = [
  { name: "Pequeno", dim: "10 × 10 cm", text: "Logótipo ou nome no peito, manga ou gola.", box: "h-10 w-10" },
  { name: "Médio", dim: "21 × 30 cm", text: "Uma folha A4. O mais pedido para a frente.", box: "h-[4.5rem] w-12" },
  { name: "Grande", dim: "28 × 35 cm", text: "Costas inteiras.", box: "h-20 w-16" },
];

const th = "px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground";

export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <ClothingRailHero
          items={RAIL}
          hanger="wood"
          autoplay
          eyebrow="Personalizados em Elvas"
          heading="Roupa, canecas e presentes com o teu desenho, nome ou fotografia."
          caption="Passa o rato pelo cabide, arrasta uma peça ou toca para ver as costas."
          labels={{ front: "Frente", back: "Costas", close: "Fechar", show: "Ver" }}
          className="min-h-[calc(100svh-3.5rem)] [&>div:nth-of-type(2)]:mt-8"
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#orcamento" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">Calcular o meu preço</a>
              <a href="#precos" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">Ver preços</a>
            </div>
          }
        />

        <Section eyebrow="Desenho" title="Tamanhos do desenho" sub="O preço da peça depende do tamanho do desenho.">
          <div className="grid gap-4 sm:grid-cols-3">
            {SIZE_CARDS.map((s) => (
              <article key={s.name} className={`${card} flex flex-col gap-4 p-6`}>
                <div className="flex h-24 items-end"><div aria-hidden="true" className={`${s.box} rounded-md border border-dashed border-foreground/40 bg-muted`} /></div>
                <div>
                  <h3 className="font-medium">{s.name} <span className="ml-1 font-mono text-xs font-normal text-muted-foreground">{s.dim}</span></h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="precos" tint eyebrow="Roupa" title="Preços da roupa" sub="Preço por peça. Escolhe adulto ou bebé e criança.">
          <PriceTabs />
          <h3 className="mb-4 mt-12 text-sm font-medium">Extras na roupa</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {EXTRAS.map((e) => (
              <li key={e.text} className={`${card} flex items-center gap-4 p-4`}>
                <b className="shrink-0 whitespace-nowrap text-xl font-medium tabular-nums">{e.price}</b>
                <span className="text-sm leading-snug text-muted-foreground">{e.text}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="presentes" eyebrow="Presentes" title="Canecas e presentes" sub="Escolhe da prateleira o que queres levar.">
          <ProductShelf />
        </Section>

        <Section id="packs" tint eyebrow="Promoções" title="Packs e promoções">
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-foreground p-6 text-background">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] opacity-70">Pack Família</p>
              <p className="mt-3 text-4xl font-medium tracking-tight tabular-nums">84,90 €</p>
              <p className="mt-2 text-sm opacity-80">4 sweats iguais: bebé, criança e 2 adultos.</p>
            </article>
            <article className={`${card} p-6`}>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Caneca + porta-chaves</p>
              <p className="mt-3 text-4xl font-medium tracking-tight tabular-nums">12,90 €</p>
              <p className="mt-2 text-sm text-muted-foreground">Com a mesma foto.</p>
            </article>
            <article className={`${card} p-6`}>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Canecas para grupos</p>
              <p className="mt-3 text-4xl font-medium tracking-tight tabular-nums">7,90 € <span className="text-base font-normal text-muted-foreground">cada</span></p>
              <p className="mt-2 text-sm text-muted-foreground">A partir de 10 unidades.</p>
            </article>
          </div>

          <h3 className="mb-1 mt-12 text-sm font-medium">Preço de grupo na roupa</h3>
          <p className="mb-4 text-sm text-muted-foreground">10 ou mais peças, para escolas, equipas, festas e empresas.</p>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[460px] text-sm">
              <thead><tr className="border-b border-border"><th className={th}>Peça</th><th className={th}>Frente + costas + nome</th><th className={th}>Só frente</th></tr></thead>
              <tbody className="divide-y divide-border">
                {GROUP_TABLE.map((r) => (
                  <tr key={r.name}><th scope="row" className="px-5 py-3.5 text-left font-medium">{r.name}</th><td className="px-5 py-3.5 tabular-nums">{r.full}</td><td className="px-5 py-3.5 tabular-nums">{r.front}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="natal" eyebrow="Natal" title="Natal, educadoras e auxiliares" sub="Encomenda com antecedência para garantir a entrega.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {XMAS.map((g) => (
              <article key={g.name} className={`${card} flex flex-col gap-1 p-6`}>
                <h3 className="font-medium">{g.name}</h3>
                {g.note && <p className="text-xs text-muted-foreground">{g.note}</p>}
                <p className="mt-4 text-xl font-medium tabular-nums">{g.price}</p>
              </article>
            ))}
            <article className={`${card} flex flex-col gap-1 p-6`}>
              <h3 className="font-medium">Sweats de Natal com nome</h3>
              <p className="text-xs text-muted-foreground">Preços da tabela de roupa</p>
              <a href="#precos" className="mt-2 inline-block py-2 text-sm font-medium underline underline-offset-4">Ver preços</a>
            </article>
          </div>
        </Section>

        <Section id="como" tint eyebrow="Passo a passo" title="Como funciona">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className={`${card} flex flex-col gap-2 p-6`}>
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">{String(i + 1).padStart(2, "0")} / 04</span>
                <b className="font-medium">{s.t}</b>
                <span className="text-sm text-muted-foreground">{s.d}</span>
              </li>
            ))}
          </ol>
          <ul className="mt-8 grid gap-2 text-sm text-muted-foreground">
            <li>Tamanhos desde bebé (6 meses) até adulto XXL. As cores das peças dependem da disponibilidade.</li>
            <li>Fotografias com pouca qualidade: avisamos antes de produzir.</li>
            <li>Natal: encomenda com antecedência para garantir a entrega.</li>
          </ul>
        </Section>

        <Section id="orcamento" eyebrow="Orçamento" title="Quanto custa o meu pedido?" sub="Faz uma estimativa e envia-nos o pedido. Confirmamos o preço final com a prova.">
          <div className="mx-auto max-w-xl"><Calculator /></div>
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <div>
            <p className="text-sm font-medium">Feito em Família</p>
            <p className="text-sm text-muted-foreground">Personalizados em Elvas.</p>
          </div>
          <div className="flex gap-3 text-sm">
            {CONTACT.whatsapp && <a className="rounded-full border border-border px-4 py-2 transition-colors hover:bg-muted" href={`https://wa.me/${CONTACT.whatsapp}`}>WhatsApp</a>}
            {CONTACT.instagram && <a className="rounded-full border border-border px-4 py-2 transition-colors hover:bg-muted" href={`https://instagram.com/${CONTACT.instagram}`}>Instagram</a>}
            {!CONTACT.whatsapp && !CONTACT.instagram && <a className="rounded-full border border-border px-4 py-2 transition-colors hover:bg-muted" href="#orcamento">Pedir orçamento</a>}
          </div>
        </div>
      </footer>
    </>
  );
}
