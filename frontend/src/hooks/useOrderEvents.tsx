import { useQuery } from "@tanstack/react-query";

import { getOrderEvents } from "../api/orders.api";

export const useOrderEvents = (id: string) => {
  return useQuery({
    queryKey: ["order-events", id],
    queryFn: () => getOrderEvents(id),
    enabled: !!id,
    refetchInterval: 3000,
  });
};