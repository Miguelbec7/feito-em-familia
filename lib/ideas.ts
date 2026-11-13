import type { Side } from "@/lib/photos";

export type Idea = {
  id: string;
  title: string;
  blurb: string;
  /** id da peça (tem de ter foto em lib/photos.ts) */
  piece: string;
  color: string;
  side: Side;
  /** 0 = pequeno, 1 = médio, 2 = grande */
  size: number;
  text: string;
};

/** Ideias de desenhos. Quando houver trabalhos reais de clientes, juntam-se aqui (com foto própria). */
export const IDEAS: Idea[] = [
  { id: "natal", title: "Natal em família", blurb: "A mesma sweat para todos, com o nome de cada um.", piece: "sweat", color: "Vermelho", side: "front", size: 1, text: "Natal" },
  { id: "mae", title: "Dia da Mãe", blurb: "Uma prenda simples, feita com o nome dela.", piece: "tshirt", color: "Rosa", side: "front", size: 1, text: "Mãe" },
  { id: "pai", title: "Para o Pai", blurb: "Letras grandes nas costas.", piece: "oversize", color: "Preto", side: "back", size: 2, text: "PAI" },
  { id: "bebe", title: "O primeiro Natal", blurb: "Para o bebé, pequenino no peito.", piece: "body", color: "Branco", side: "front", size: 0, text: "1.º Natal" },
  { id: "turma", title: "Turma e equipa", blurb: "Costas grandes com o nome da turma ou do clube.", piece: "capuz", color: "Azul-marinho", side: "back", size: 2, text: "TURMA 4.ºB" },
  { id: "mini", title: "Mini equipa", blurb: "Combina com os adultos, ideal para o Pack Família.", piece: "sweatk", color: "Verde", side: "front", size: 1, text: "Mini" },
];
