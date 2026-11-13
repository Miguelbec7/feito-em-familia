import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feito em Família · Personalizados em Elvas",
  description:
    "Roupa, canecas e presentes personalizados com o teu desenho, nome ou fotografia. Prova antes de pagar, pronto em 7 a 10 dias.",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
