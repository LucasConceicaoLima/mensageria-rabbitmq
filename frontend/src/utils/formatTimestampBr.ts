export const formatTimestampBr = (
  value: string | Date,
) => {
  return new Date(value).toLocaleString(
    "pt-BR",
  );
};