import { SWEAT_PHOTO } from "@/lib/sweat";
import branco from "@/assets/oversize/branco.webp";
import preto from "@/assets/oversize/preto.webp";
import marinho from "@/assets/oversize/azul-marinho.webp";
import cinzento from "@/assets/oversize/cinzento.webp";
import vermelho from "@/assets/oversize/vermelho.webp";
import verde from "@/assets/oversize/verde.webp";
import royal from "@/assets/oversize/azul-royal.webp";
import amarelo from "@/assets/oversize/amarelo.webp";
import rosa from "@/assets/oversize/rosa.webp";
import bege from "@/assets/oversize/bege.webp";
import pretoLogo from "@/assets/oversize/preto-logo.webp";

/** Peça fotografada: imagens por cor e onde ficam o peito e as costas (em pixéis da imagem). */
export type PhotoSpec = {
  w: number; h: number;
  images: Record<string, string>;
  /** pixéis por cm na peça */
  cm: number;
  chestX: number; smallX: number; smallY: number; topFront: number; topBack: number;
};

export const PHOTOS: Record<string, PhotoSpec> = {
  sweat: { w: 415, h: 474, images: SWEAT_PHOTO, cm: 3.4, chestX: 207, smallX: 262, smallY: 92, topFront: 92, topBack: 66 },
  oversize: {
    w: 600, h: 704, cm: 5.83, chestX: 300, smallX: 384, smallY: 119, topFront: 105, topBack: 70,
    images: {
      Branco: branco.src, Preto: preto.src, "Azul-marinho": marinho.src, Cinzento: cinzento.src, Vermelho: vermelho.src,
      Verde: verde.src, "Azul royal": royal.src, Amarelo: amarelo.src, Rosa: rosa.src, Bege: bege.src,
    },
  },
};

/** T-shirt oversize preta com o símbolo no peito (cabide). */
export const OVERSIZE_WITH_LOGO = pretoLogo.src;
