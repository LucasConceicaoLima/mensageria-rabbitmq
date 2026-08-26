export const translateOrderEventMessage = (message: string) => {
  const translations: Record<string, string> = {
    "Order created.": "Pedido criado.",
    "Processing payment.": "Processando pagamento.",
    "Payment approved.": "Pagamento aprovado.",
    "Payment rejected.": "Pagamento rejeitado.",
  };

  return translations[message] ?? message;
};