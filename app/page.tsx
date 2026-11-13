import ClothingRailHero, { type RailGarment } from "@/components/ui/product-rail-gallery";
import { Header } from "@/components/site/header";
import { Section, card } from "@/components/site/section";
import { PriceTabs } from "@/components/site/price-tabs";
import { Ideas } from "@/components/site/ideas";
import { ProductShelf } from "@/components/site/product-shelf";
import { Customizer } from "@/components/site/customizer";
import { Calculator } from "@/components/site/calculator";
import logo from "@/assets/logo-mark.webp";
import { SWEAT_WITH_LOGO } from "@/lib/sweat";
import { BODY_WITH_LOGO, HOODIE_WITH_LOGO, KIDHOODIE_WITH_LOGO, KIDSWEAT_WITH_LOGO, OVERSIZE_WITH_LOGO, TSHIRT_WITH_LOGO } from "@/lib/photos";
import { CONTACT } from "@/lib/contact";
import { EXTRAS, GROUP_TABLE, STEPS, XMAS } from "@/lib/pricing";

const RAIL: RailGarment[] = [
  { id: "tshirt", name: "T-shirt clássica", kind: "tee", color: "#111111", image: TSHIRT_WITH_LOGO, tag: "10,90 €", description: "Algodão 190 g com o teu desenho, nome ou fotografia.", details: ["Algodão 190 g", "10,90 · 13,90 · 15,90 €"] },
  { id: "oversize", name: "T-shirt oversize", kind: "tee", color: "#111111", image: OVERSIZE_WITH_LOGO, tag: "17,90 €", description: "Corte largo e descontraído.", details: ["Oversize", "17,90 · 19,90 · 22,90 €"] },
  { id: "manga", name: "Manga comprida", kind: "knit", color: "#B05139", tag: "12,90 €", description: "Para os dias mais frescos.", details: ["Manga comprida", "12,90 · 15,90 · 17,90 €"] },
  { id: "sweat", name: "Sweat sem capuz", kind: "knit", color: "#1F2A44", image: SWEAT_WITH_LOGO, tag: "22,90 €", description: "Ideal para equipas, escolas e festas.", details: ["22,90 · 25,90 · 29,90 €", "Preço de grupo desde 10"] },
  { id: "capuz", name: "Sweat com capuz", kind: "hoodie", color: "#111111", image: HOODIE_WITH_LOGO, tag: "24,90 €", description: "A favorita para o Natal e para o Pack Família.", details: ["24,90 · 27,90 · 31,90 €"] },
  { id: "tshirtk", name: "T-shirt criança", kind: "tee", color: "#A3D3EB", tag: "9,90 €", description: "Também com a fotografia da criança.", details: ["9,90 · 12,90 · 14,90 €"] },
  { id: "sweatk", name: "Sweat criança", kind: "knit", color: "#D9A9A0", image: KIDSWEAT_WITH_LOGO, tag: "19,90 €", description: "Para os mais pequenos, com o desenho que quiseres.", details: ["19,90 €", "Com fotografia 21,90 €"] },
  { id: "body", name: "Body de bebé", kind: "tee", color: "#F2EFE8", image: BODY_WITH_LOGO, tag: "11,90 €", description: "Dos 3 aos 24 meses, com o desenho que quiseres.", details: ["11,90 €", "3 a 24 meses"] },
  { id: "capuzk", name: "Sweat criança com capuz", kind: "hoodie", color: "#F2EFE8", image: KIDHOODIE_WITH_LOGO, tag: "23,90 €", description: "Combina com os adultos no Pack Família.", details: ["23,90 €"] },
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
              <a href="#personaliza" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">Calcular o meu preço</a>
              <a href="#precos" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">Ver preços</a>
            </div>
          }
        />

        <Section id="personaliza" eyebrow="Cria a tua peça" title="Escolhe a peça, a cor e o desenho." sub="Vê já como fica e a estimativa do preço. A imagem envias tu a seguir, na conversa.">
          <Customizer />
        </Section>

        <Section id="presentes" eyebrow="Presentes" title="Canecas e presentes" sub="Escolhe da prateleira o que queres levar.">
          <ProductShelf />
        </Section>

        <Section id="ideias" tint eyebrow="Ideias" title="Ideias para ti" sub="Escolhe uma e muda o que quiseres: a peça, a cor, o texto e o tamanho.">
          <Ideas />
        </Section>

        <Section id="precos" eyebrow="Preços" title="Packs e preços">
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
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Grupos (10 ou mais)</p>
              <p className="mt-3 text-4xl font-medium tracking-tight tabular-nums">desde 7,90 €</p>
              <p className="mt-2 text-sm text-muted-foreground">Canecas e roupa para escolas, equipas e festas.</p>
            </article>
          </div>

          <details className="group mt-6 rounded-2xl border border-border bg-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              Ver todos os preços (roupa, extras, grupos e Natal)
              <span aria-hidden="true" className="text-lg leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="grid gap-10 border-t border-border p-6">
              <div>
                <h3 className="mb-4 text-sm font-medium">Roupa</h3>
                <PriceTabs />
                <h3 className="mb-3 mt-8 text-sm font-medium">Extras na roupa</h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {EXTRAS.map((e) => (
                    <li key={e.text} className="flex items-center gap-4 rounded-xl border border-border p-4">
                      <b className="shrink-0 whitespace-nowrap text-xl font-medium tabular-nums text-brand">{e.price}</b>
                      <span className="text-sm leading-snug text-muted-foreground">{e.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Preço de grupo na roupa</h3>
                <p className="mb-4 text-sm text-muted-foreground">10 ou mais peças, para escolas, equipas, festas e empresas.</p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[460px] text-sm">
                    <thead><tr className="border-b border-border"><th className={th}>Peça</th><th className={th}>Frente + costas + nome</th><th className={th}>Só frente</th></tr></thead>
                    <tbody className="divide-y divide-border">
                      {GROUP_TABLE.map((r) => (
                        <tr key={r.name}><th scope="row" className="px-5 py-3.5 text-left font-medium">{r.name}</th><td className="px-5 py-3.5 tabular-nums">{r.full}</td><td className="px-5 py-3.5 tabular-nums">{r.front}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Natal, educadoras e auxiliares</h3>
                <p className="mb-4 text-sm text-muted-foreground">Encomenda com antecedência para garantir a entrega. Sweats de Natal com nome: preços da tabela de roupa.</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {XMAS.map((g) => (
                    <li key={g.name} className="flex items-baseline justify-between gap-4 rounded-xl border border-border px-4 py-3 text-sm">
                      <span>{g.name}{g.note && <span className="block text-xs text-muted-foreground">{g.note}</span>}</span>
                      <b className="shrink-0 font-medium tabular-nums">{g.price}</b>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
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

        <Section id="orcamento" eyebrow="Orçamento" title="Pedido rápido" sub="Faz uma estimativa e envia-nos o pedido. Confirmamos o preço final com a prova.">
          <div className="mx-auto max-w-xl"><Calculator /></div>
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <div className="flex items-center gap-4">
            <img src={logo.src} width={72} height={72} alt="Feito em Família, personalizados com amor" className="size-[4.5rem] rounded-full" />
            <div>
              <p className="text-sm font-medium">Feito em Família</p>
              <p className="text-sm text-muted-foreground">Personalizados com amor, em Elvas.</p>
            </div>
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
