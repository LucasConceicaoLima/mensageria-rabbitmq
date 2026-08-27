import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createOrder,
  getOrderById,
  getOrders,
  processPayment,
} from "../api/orders.api";

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    refetchInterval: 5000,
  });

export const useOrder = (id: string) =>
  useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id),

    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (
        status === "APPROVED" ||
        status === "REJECTED"
      ) {
        return false;
      }

      return 3000;
    },
  });

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export const useProcessPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processPayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};