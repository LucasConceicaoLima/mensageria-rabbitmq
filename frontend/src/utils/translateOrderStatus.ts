export const translateOrderStatus = (status: string) => {
  const translations: Record<string, string> = {
    PENDING: "Pendente",
    PROCESSING_PAYMENT: "Processando pagamento",
    APPROVED: "Aprovado",
    REJECTED: "Rejeitado",
  };

  return translations[status] ?? status;
};