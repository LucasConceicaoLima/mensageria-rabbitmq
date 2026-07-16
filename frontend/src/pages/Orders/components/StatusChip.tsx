import { Chip } from "@mui/material";

interface Props {
  status: string;
}

export const StatusChip = ({ status }: Props) => {
  switch (status) {
    case "PENDING":
      return (
        <Chip
          label="Pending"
          color="warning"
          size="small"
        />
      );

    case "PROCESSING_PAYMENT":
      return (
        <Chip
          label="Processing"
          color="info"
          size="small"
        />
      );

    case "APPROVED":
      return (
        <Chip
          label="Approved"
          color="success"
          size="small"
        />
      );

    case "REJECTED":
      return (
        <Chip
          label="Rejected"
          color="error"
          size="small"
        />
      );

    default:
      return (
        <Chip
          label={status}
          size="small"
        />
      );
  }
};