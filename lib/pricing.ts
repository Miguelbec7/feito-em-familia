export const SIZES = ["Pequeno", "Médio", "Grande"] as const;

export type Piece = {
  id: string;
  name: string;
  note?: string;
  /** Um preço por tamanho do desenho (null = indisponível). Um só valor = tamanho único. */
  prices: (number | null)[];
  /** Preço de grupo (10+): [frente + costas + nome, só frente]. */
  group?: [number, number];
  kid?: boolean;
  mug?: boolean;
  /** Peça de preço fixo, sem extras (presentes). */
  flat?: boolean;
  /** Texto mostrado na tabela de bebé/criança. */
  show?: string;
  photo?: string;
};

export const ADULT: Piece[] = [
  { id: "tshirt", name: "T-shirt clássica", note: "Algodão 190 g", prices: [11.9, 14.9, 16.9], group: [11.5, 9.9] },
  { id: "oversize", name: "T-shirt oversize", prices: [19.9, 22.9, 26.9] },
  { id: "manga", name: "Manga comprida", prices: [14.9, 17.9, null] },
  { id: "sweat", name: "Sweat sem capuz", prices: [24.9, 29.9, 34.9], group: [22.9, 20.9] },
  { id: "capuz", name: "Sweat com capuz", prices: [29.9, 32.9, 36.9], group: [26.9, 24.9] },
];

export const KIDS: Piece[] = [
  { id: "body", name: "Body de bebé", note: "3 a 24 meses", prices: [12.9], show: "12,90 €", photo: "—", kid: true },
  { id: "sweatbebe", name: "Sweat de bebé", note: "6 a 24 meses", prices: [17.9], show: "17,90 €", photo: "—", kid: true },
  { id: "tshirtk", name: "T-shirt criança", note: "Pequeno · Médio · Grande", prices: [10.9, 12.9, 14.9], show: "10,90 · 12,90 · 14,90 €", photo: "12,90 a 14,90 €", kid: true },
  { id: "sweatk", name: "Sweat criança", prices: [19.9], show: "19,90 €", photo: "21,90 €", kid: true },
  { id: "capuzk", name: "Sweat criança com capuz", prices: [24.9], show: "24,90 €", photo: "—", kid: true },
];

export const MUGS: Piece[] = [
  { id: "m-nome", name: "Caneca com nome", prices: [8.9], mug: true },
  { id: "m-foto", name: "Caneca com foto", prices: [9.9], mug: true },
  { id: "m-design", name: "Caneca com design completo", prices: [11.9], mug: true },
];

export const PRESENTS: Piece[] = [
  { id: "g-magica", name: "Caneca mágica", note: "Sujeita a stock", prices: [14.9], flat: true },
  { id: "g-chaves", name: "Porta-chaves com foto", prices: [4.9], flat: true },
  { id: "g-placa1", name: "Placa de alumínio 15×20 cm", note: "Com foto", prices: [12.9], flat: true },
  { id: "g-placa2", name: "Placa de alumínio 20×25 cm", note: "Com foto", prices: [17.9], flat: true },
  { id: "g-combo", name: "Caneca + porta-chaves", note: "Com a mesma foto", prices: [12.9], flat: true },
];

export type ShelfItem = {
  id: string;
  name: string;
  note?: string;
  price: string;
  kind: "mug" | "magic" | "keychain" | "plate" | "combo";
  art?: "nome" | "foto" | "design";
  color: string;
  /** Fotografia real do produto (recorte transparente). Substitui a ilustração. */
  image?: string;
  /** id da peça na calculadora. */
  pick: string;
};

export const SHELVES: { title: string; items: ShelfItem[] }[] = [
  {
    title: "Canecas",
    items: [
      { id: "m-nome", name: "Caneca com nome", price: "8,90 €", kind: "mug", art: "nome", color: "#E9E4D8", pick: "m-nome" },
      { id: "m-foto", name: "Caneca com foto", price: "9,90 €", kind: "mug", art: "foto", color: "#F2F0EA", pick: "m-foto" },
      { id: "m-design", name: "Caneca com design completo", price: "11,90 €", kind: "mug", art: "design", color: "#DE9C31", pick: "m-design" },
      { id: "g-magica", name: "Caneca mágica", note: "Sujeita a stock", price: "14,90 €", kind: "magic", color: "#16181B", pick: "g-magica" },
    ],
  },
  {
    title: "Presentes",
    items: [
      { id: "g-chaves", name: "Porta-chaves com foto", price: "4,90 €", kind: "keychain", color: "#A3D3EB", pick: "g-chaves" },
      { id: "g-placa1", name: "Placa de alumínio · 15×20 cm", note: "Brilhante, cores vivas", price: "12,90 €", kind: "plate", color: "#CCB2E0", pick: "g-placa1" },
      { id: "g-placa2", name: "Placa de alumínio · 20×25 cm", note: "Brilhante, cores vivas", price: "17,90 €", kind: "plate", color: "#B05139", pick: "g-placa2" },
      { id: "g-combo", name: "Caneca + porta-chaves", note: "Com a mesma foto", price: "12,90 €", kind: "combo", color: "#185B37", pick: "g-combo" },
    ],
  },
];

export const eur = (n: number) =>
  n.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export const EXTRAS = [
  { price: "+5 €", text: "Desenho extra (ex.: frente e costas) no adulto" },
  { price: "+4 €", text: "Desenho extra na criança" },
  { price: "+2 €", text: "Nome nas costas ou na manga" },
  { price: "+2 €", text: "Desenho feito a partir de fotografia" },
];

export const GROUP_TABLE = [
  { name: "T-shirt 190 g", full: "11,50 €", front: "9,90 €" },
  { name: "Sweat", full: "22,90 €", front: "20,90 €" },
  { name: "Sweat com capuz", full: "26,90 €", front: "24,90 €" },
];

export const XMAS = [
  { name: "Avental personalizado", price: "14,90 €" },
  { name: "Saco de pano com nome", price: "9,90 €" },
  { name: "Saco de pano com os desenhos das crianças", price: "12,90 €" },
  { name: "Caneca da turma", note: "10 ou mais unidades", price: "desde 7,90 €" },
];

export const STEPS = [
  { t: "Envias a ideia", d: "Foto, desenho, logótipo ou nome." },
  { t: "Recebes uma prova", d: "Vês como fica antes de avançar." },
  { t: "Confirmas e pagas", d: "Tamanho e cor da peça." },
  { t: "Levantas ou enviamos", d: "Normalmente pronto em 7 a 10 dias." },
];
