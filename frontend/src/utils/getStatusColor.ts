import type { ChipProps } from "@mui/material";

export const getStatusColor = (
  status: string,
): ChipProps["color"] => {
  switch (status) {
    case "PENDING":
      return "warning";

    case "PROCESSING_PAYMENT":
      return "info";

    case "APPROVED":
      return "success";

    case "REJECTED":
      return "error";

    default:
      return "default";
  }
};