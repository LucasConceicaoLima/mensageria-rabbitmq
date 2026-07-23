export const formatOrderStatus = (
  status: string,
) => {
  return status.replaceAll("_", " ");
};