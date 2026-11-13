// BASE_PATH só é usado no GitHub Pages (ex.: "/F.Cardoso"). Com domínio próprio ou Cloudflare fica vazio.
/** @type {import('next').NextConfig} */
export default {
  output: "export",
  basePath: process.env.BASE_PATH || "",
};
