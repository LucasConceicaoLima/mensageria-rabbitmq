export const formatDateBr = (
  value: string | Date,
) => {
  return new Date(value).toLocaleDateString(
    "pt-BR",
  );
};