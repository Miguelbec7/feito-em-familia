import type { Piece } from "@/lib/pricing";

export type EstimateInput = { sizeIdx: number; qty: number; extra: boolean; nameX: boolean; photo: boolean };

/** Estimativa de preço partilhada pela calculadora e pelo configurador. */
export function estimate(piece: Piece, { sizeIdx, qty, extra, nameX, photo }: EstimateInput) {
  const noExtras = !!(piece.mug || piece.flat);
  const canPhoto = !noExtras && piece.photo !== "—";
  const n = Math.max(1, Math.min(500, qty || 1));
  const idx = piece.prices.length === 1 ? 0 : piece.prices[sizeIdx] != null ? sizeIdx : piece.prices.findIndex((v) => v != null);

  let unit = piece.prices[idx] ?? 0;
  let hint = "";
  if (piece.mug && n >= 10) {
    unit = 7.9;
    hint = "Preço de grupo aplicado (10 ou mais).";
  } else if (n >= 10 && piece.group) {
    const full = extra && nameX;
    unit = piece.group[full ? 0 : 1];
    hint = full ? "Preço de grupo: frente + costas + nome." : "Preço de grupo: só frente. Marca desenho extra e nome para frente + costas + nome.";
  } else {
    if (extra && !noExtras) unit += piece.kid ? 4 : 5;
    if (nameX && !noExtras) unit += 2;
    if (photo && canPhoto) unit += 2;
    if (n >= 10 && !noExtras) hint = "Para 10 ou mais peças, pede-nos o preço de grupo.";
  }
  return { unit, total: unit * n, n, idx, hint, noExtras, canPhoto };
}
