export function Section({ id, eyebrow, title, sub, tint, children }: {
  id?: string; eyebrow?: string; title: string; sub?: string; tint?: boolean; children: React.ReactNode;
}) {
  return (
    <section id={id} className={tint ? "border-y border-border bg-muted/50" : ""}>
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-2">
          {eyebrow && <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">{eyebrow}</p>}
          <h2 className="text-balance text-2xl font-medium tracking-tight sm:text-3xl">{title}</h2>
          {sub && <p className="max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export const card = "rounded-2xl border border-border bg-card text-card-foreground";
