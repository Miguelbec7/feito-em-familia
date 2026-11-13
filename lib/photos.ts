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
import tBranco from "@/assets/tshirt/branco.webp";
import tPreto from "@/assets/tshirt/preto.webp";
import tMarinho from "@/assets/tshirt/azul-marinho.webp";
import tCinzento from "@/assets/tshirt/cinzento.webp";
import tVermelho from "@/assets/tshirt/vermelho.webp";
import tVerde from "@/assets/tshirt/verde.webp";
import tRoyal from "@/assets/tshirt/azul-royal.webp";
import tAmarelo from "@/assets/tshirt/amarelo.webp";
import tRosa from "@/assets/tshirt/rosa.webp";
import tBege from "@/assets/tshirt/bege.webp";
import tPretoLogo from "@/assets/tshirt/preto-logo.webp";
import pretoLogo from "@/assets/oversize/preto-logo.webp";
import kBranco from "@/assets/sweat-crianca/branco.webp";
import kPreto from "@/assets/sweat-crianca/preto.webp";
import kMarinho from "@/assets/sweat-crianca/azul-marinho.webp";
import kCinzento from "@/assets/sweat-crianca/cinzento.webp";
import kVermelho from "@/assets/sweat-crianca/vermelho.webp";
import kVerde from "@/assets/sweat-crianca/verde.webp";
import kRoyal from "@/assets/sweat-crianca/azul-royal.webp";
import kAmarelo from "@/assets/sweat-crianca/amarelo.webp";
import kRosa from "@/assets/sweat-crianca/rosa.webp";
import kBege from "@/assets/sweat-crianca/bege.webp";
import kRosaLogo from "@/assets/sweat-crianca/rosa-logo.webp";

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
  tshirt: {
    w: 500, h: 543, cm: 5.65, chestX: 250, smallX: 324, smallY: 118, topFront: 106, topBack: 72,
    images: {
      Branco: tBranco.src, Preto: tPreto.src, "Azul-marinho": tMarinho.src, Cinzento: tCinzento.src, Vermelho: tVermelho.src,
      Verde: tVerde.src, "Azul royal": tRoyal.src, Amarelo: tAmarelo.src, Rosa: tRosa.src, Bege: tBege.src,
    },
  },
  sweatk: {
    w: 520, h: 622, cm: 8.67, chestX: 260, smallX: 352, smallY: 110, topFront: 98, topBack: 69,
    images: {
      Branco: kBranco.src, Preto: kPreto.src, "Azul-marinho": kMarinho.src, Cinzento: kCinzento.src, Vermelho: kVermelho.src,
      Verde: kVerde.src, "Azul royal": kRoyal.src, Amarelo: kAmarelo.src, Rosa: kRosa.src, Bege: kBege.src,
    },
  },
  oversize: {
    w: 600, h: 704, cm: 5.83, chestX: 300, smallX: 384, smallY: 119, topFront: 105, topBack: 70,
    images: {
      Branco: branco.src, Preto: preto.src, "Azul-marinho": marinho.src, Cinzento: cinzento.src, Vermelho: vermelho.src,
      Verde: verde.src, "Azul royal": royal.src, Amarelo: amarelo.src, Rosa: rosa.src, Bege: bege.src,
    },
  },
};

/** T-shirt clássica preta com o símbolo no peito (cabide). */
export const TSHIRT_WITH_LOGO = tPretoLogo.src;

/** Sweat de criança rosa com o símbolo no peito (cabide). */
export const KIDSWEAT_WITH_LOGO = kRosaLogo.src;

/** T-shirt oversize preta com o símbolo no peito (cabide). */
export const OVERSIZE_WITH_LOGO = pretoLogo.src;
