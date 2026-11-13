import renas from "@/assets/ideias/renas.webp";
import familiaClaro from "@/assets/ideias/familia-claro.webp";
import familiaAzul from "@/assets/ideias/familia-azul.webp";
import gael from "@/assets/ideias/gael.webp";
import ariana from "@/assets/ideias/ariana.webp";
import bolinhos from "@/assets/ideias/bolinhos.webp";

import bodyPai from "@/assets/ideias/body-pai-natal.webp";
import menina from "@/assets/ideias/menina-natal.webp";
import dino from "@/assets/ideias/dinossauros.webp";
import biscoitos from "@/assets/ideias/biscoitos.webp";
import polo from "@/assets/ideias/polo-norte.webp";
import bodyRena from "@/assets/ideias/body-rena.webp";

export type Idea = {
  id: string;
  title: string;
  blurb: string;
  /** Fotografia / montagem da ideia */
  image: string;
  /** id da peça (tem de ter foto em lib/photos.ts) e cor sugeridas */
  piece: string;
  color: string;
};

/** Ideias de desenhos para inspirar. Trocar/acrescentar aqui; as imagens ficam em assets/ideias. */
export const IDEAS: Idea[] = [
  { id: "renas", title: "Renas de Natal", blurb: "Uma rena e uma frase para cada um: Avó, Pai, Mãe…", image: renas.src, piece: "sweat", color: "Azul-marinho" },
  { id: "familia-claro", title: "A nossa família", blurb: "A família desenhada, com chapéu de Natal e uma frase.", image: familiaClaro.src, piece: "sweat", color: "Bege" },
  { id: "familia-azul", title: "A nossa família, em azul", blurb: "O mesmo desenho, em letras brancas sobre azul-marinho.", image: familiaAzul.src, piece: "sweat", color: "Azul-marinho" },
  { id: "gael", title: "O meu nome no Natal", blurb: "Para os mais pequenos, com o nome e um desenho.", image: gael.src, piece: "sweatk", color: "Branco" },
  { id: "ariana", title: "Pequena Ariana", blurb: "Sweat de criança com o nome e a personagem.", image: ariana.src, piece: "sweatk", color: "Vermelho" },
  { id: "bolinhos", title: "Bolinhos de Natal", blurb: "Desenhos divertidos com o nome de cada um.", image: bolinhos.src, piece: "sweat", color: "Bege" },
  { id: "menina", title: "Menina de Natal", blurb: "Com o nome por baixo, em sweat de criança.", image: menina.src, piece: "sweatk", color: "Vermelho" },
  { id: "dino", title: "Dinossauros de Natal", blurb: "Para quem gosta de dinossauros, com o nome.", image: dino.src, piece: "sweatk", color: "Verde" },
  { id: "biscoitos", title: "Biscoitos de Natal", blurb: "Biscoitos, quebra-nozes e o nome da criança.", image: biscoitos.src, piece: "sweatk", color: "Vermelho" },
  { id: "polo", title: "Polo Norte", blurb: "Um passeio de trenó, com o nome.", image: polo.src, piece: "sweatk", color: "Verde" },
  { id: "body-pai-natal", title: "O meu primeiro Natal", blurb: "Body de bebé com o Pai Natal.", image: bodyPai.src, piece: "body", color: "Branco" },
  { id: "body-rena", title: "O meu primeiro Natal, com rena", blurb: "Body de bebé com uma rena e o nome do bebé.", image: bodyRena.src, piece: "body", color: "Branco" },
];
