export const formatCurrencyBrlCompact = (
  value: number,
): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);