import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

import { Typography, Paper } from "@mui/material";

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

export const OrderTimeline = ({
  events,
}: Props) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
      >
        Timeline
      </Typography>

      <Timeline sx={{ p: 0, m: 0 }}>
        {events.map((event, index) => (
          <TimelineItem key={event.id}>
            <TimelineSeparator>
              <TimelineDot color={getColor(event.status)} />

              {index < events.length - 1 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>

            <TimelineContent>
              <Typography fontWeight={600}>
                {event.status.replaceAll("_", " ")}
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
                {formatDateBr(event.createdAt)}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
};