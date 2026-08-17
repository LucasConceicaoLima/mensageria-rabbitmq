export const formatCurrencyBrl = (
  value: number | string,
) => {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};