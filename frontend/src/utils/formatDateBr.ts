export const formatDateBr = (
  value: string | Date,
) => {
  return new Date(value).toLocaleString(
    "pt-BR",
  );
};