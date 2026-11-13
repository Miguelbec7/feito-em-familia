const links = [
  ["Preços", "#precos"],
  ["Presentes", "#presentes"],
  ["Packs", "#packs"],
  ["Como funciona", "#como"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-6">
        <a href="#top" className="py-2 text-sm font-medium tracking-tight">Feito em Família</a>
        <nav aria-label="Principal" className="flex items-center gap-6">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">{label}</a>
          ))}
          <a href="#orcamento" className="rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background outline-none transition-transform hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-ring">Orçamento</a>
        </nav>
      </div>
    </header>
  );
}
