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
import cBranco from "@/assets/capuz/branco.webp";
import cPreto from "@/assets/capuz/preto.webp";
import cMarinho from "@/assets/capuz/azul-marinho.webp";
import cCinzento from "@/assets/capuz/cinzento.webp";
import cVermelho from "@/assets/capuz/vermelho.webp";
import cVerde from "@/assets/capuz/verde.webp";
import cRoyal from "@/assets/capuz/azul-royal.webp";
import cAmarelo from "@/assets/capuz/amarelo.webp";
import cRosa from "@/assets/capuz/rosa.webp";
import cBege from "@/assets/capuz/bege.webp";
import cPretoLogo from "@/assets/capuz/preto-logo.webp";
import bBranco from "@/assets/body/branco.webp";
import bPreto from "@/assets/body/preto.webp";
import bMarinho from "@/assets/body/azul-marinho.webp";
import bCinzento from "@/assets/body/cinzento.webp";
import bVermelho from "@/assets/body/vermelho.webp";
import bVerde from "@/assets/body/verde.webp";
import bRoyal from "@/assets/body/azul-royal.webp";
import bAmarelo from "@/assets/body/amarelo.webp";
import bRosa from "@/assets/body/rosa.webp";
import bBege from "@/assets/body/bege.webp";
import bBrancoLogo from "@/assets/body/branco-logo.webp";
import kcBranco from "@/assets/capuz-crianca/branco.webp";
import kcPreto from "@/assets/capuz-crianca/preto.webp";
import kcMarinho from "@/assets/capuz-crianca/azul-marinho.webp";
import kcCinzento from "@/assets/capuz-crianca/cinzento.webp";
import kcVermelho from "@/assets/capuz-crianca/vermelho.webp";
import kcVerde from "@/assets/capuz-crianca/verde.webp";
import kcRoyal from "@/assets/capuz-crianca/azul-royal.webp";
import kcAmarelo from "@/assets/capuz-crianca/amarelo.webp";
import kcRosa from "@/assets/capuz-crianca/rosa.webp";
import kcBege from "@/assets/capuz-crianca/bege.webp";
import kcBrancoLogo from "@/assets/capuz-crianca/branco-logo.webp";
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
  /** Tamanho de desenho inicial (0 = pequeno), para peças pequenas como o body de bebé. */
  defaultSize?: number;
};

export const PHOTOS: Record<string, PhotoSpec> = {
  sweat: { w: 415, h: 474, images: SWEAT_PHOTO, cm: 3.4, chestX: 207, smallX: 262, smallY: 92, topFront: 92, topBack: 66 },
  capuzk: {
    w: 341, h: 428, cm: 4.7, chestX: 170, smallX: 219, smallY: 170, topFront: 165, topBack: 135,
    images: {
      Branco: kcBranco.src, Preto: kcPreto.src, "Azul-marinho": kcMarinho.src, Cinzento: kcCinzento.src, Vermelho: kcVermelho.src,
      Verde: kcVerde.src, "Azul royal": kcRoyal.src, Amarelo: kcAmarelo.src, Rosa: kcRosa.src, Bege: kcBege.src,
    },
  },
  body: {
    w: 500, h: 463, cm: 9.6, chestX: 250, smallX: 305, smallY: 131, topFront: 122, topBack: 100, defaultSize: 0,
    images: {
      Branco: bBranco.src, Preto: bPreto.src, "Azul-marinho": bMarinho.src, Cinzento: bCinzento.src, Vermelho: bVermelho.src,
      Verde: bVerde.src, "Azul royal": bRoyal.src, Amarelo: bAmarelo.src, Rosa: bRosa.src, Bege: bBege.src,
    },
  },
  tshirt: {
    w: 500, h: 540, cm: 5.33, chestX: 250, smallX: 326, smallY: 113, topFront: 105, topBack: 77,
    images: {
      Branco: tBranco.src, Preto: tPreto.src, "Azul-marinho": tMarinho.src, Cinzento: tCinzento.src, Vermelho: tVermelho.src,
      Verde: tVerde.src, "Azul royal": tRoyal.src, Amarelo: tAmarelo.src, Rosa: tRosa.src, Bege: tBege.src,
    },
  },
  capuz: {
    w: 440, h: 588, cm: 5.06, chestX: 220, smallX: 299, smallY: 272, topFront: 269, topBack: 205,
    images: {
      Branco: cBranco.src, Preto: cPreto.src, "Azul-marinho": cMarinho.src, Cinzento: cCinzento.src, Vermelho: cVermelho.src,
      Verde: cVerde.src, "Azul royal": cRoyal.src, Amarelo: cAmarelo.src, Rosa: cRosa.src, Bege: cBege.src,
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

/** Sweat de criança com capuz branca com o símbolo no peito (cabide). */
export const KIDHOODIE_WITH_LOGO = kcBrancoLogo.src;

/** Body de bebé branco com o símbolo no peito (cabide). */
export const BODY_WITH_LOGO = bBrancoLogo.src;

/** Sweat com capuz preta com o símbolo no peito (cabide). */
export const HOODIE_WITH_LOGO = cPretoLogo.src;

/** T-shirt clássica preta com o símbolo no peito (cabide). */
export const TSHIRT_WITH_LOGO = tPretoLogo.src;

/** Sweat de criança rosa com o símbolo no peito (cabide). */
export const KIDSWEAT_WITH_LOGO = kRosaLogo.src;

/** T-shirt oversize preta com o símbolo no peito (cabide). */
export const OVERSIZE_WITH_LOGO = pretoLogo.src;
