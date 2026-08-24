import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";

import {
  Card,
  Typography,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import type { OrderEventResponse } from "../../../types/OrderEventResponse";

import { formatDateBr } from "../../../utils/formatDateBr";

interface Props {
  events: OrderEventResponse[];
}

const getColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "success";

    case "REJECTED":
      return "error";

    case "PROCESSING_PAYMENT":
      return "warning";

    default:
      return "primary";
  }
};

const getIcon = (status: string) => {
  switch (status) {
    case "APPROVED":
      return <CheckCircleIcon fontSize="small" />;

    case "REJECTED":
      return <CancelIcon fontSize="small" />;

    case "PROCESSING_PAYMENT":
      return <AutorenewIcon fontSize="small" />;

    default:
      return <ReceiptLongIcon fontSize="small" />;
  }
};

export const OrderTimeline = ({
  events,
}: Props) => {
  return (
    <Card
      elevation={5}
      sx={{
        borderRadius: 3,
        p: 3,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
      >
        Timeline
      </Typography>

      <Timeline
        sx={{
          p: 0,
          m: 0,

          "& .MuiTimelineItem-root:before":
            {
              display: "none",
            },
        }}
      >
        {events.map(
          (event, index) => (
            <TimelineItem
              key={event.id}
            >
              <TimelineSeparator>
                <TimelineDot
                  color={getColor(
                    event.status,
                  )}
                >
                  {getIcon(
                    event.status,
                  )}
                </TimelineDot>

                {index <
                  events.length -
                    1 && (
                  <TimelineConnector />
                )}
              </TimelineSeparator>

              <TimelineContent>
                <Typography
                  fontWeight={700}
                >
                  {event.status.replaceAll(
                    "_",
                    " ",
                  )}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {event.message}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {formatDateBr(
                    event.createdAt,
                  )}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ),
        )}
      </Timeline>
    </Card>
  );
};