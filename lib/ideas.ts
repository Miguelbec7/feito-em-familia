import renas from "@/assets/ideias/renas.webp";
import familiaClaro from "@/assets/ideias/familia-claro.webp";
import familiaAzul from "@/assets/ideias/familia-azul.webp";
import gael from "@/assets/ideias/gael.webp";
import ariana from "@/assets/ideias/ariana.webp";
import bolinhos from "@/assets/ideias/bolinhos.webp";

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
];
