# Feito em Família

Site de personalizados em Elvas (Next.js, Tailwind, exportação estática).

- Contactos: `lib/contact.ts`
- Preços: `lib/pricing.ts`
- Peças do cabide: `app/page.tsx` (constante `RAIL`)
- Correr localmente: `npm install && npm run dev`
- Build estático: `npm run build` (pasta `out`)

## Publicar
- **GitHub Pages:** Settings → Pages → Source: GitHub Actions. O workflow em `.github/workflows/pages.yml` publica a cada push para `main`.
- **Cloudflare Pages:** build `npm run build`, output `out`, sem BASE_PATH.
