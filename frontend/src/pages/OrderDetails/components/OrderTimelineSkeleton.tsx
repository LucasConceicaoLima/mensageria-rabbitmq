import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";

import {
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

export const OrderTimelineSkeleton = () => {
  return (
    <Paper elevation={5} sx={{ p: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
      >
        Timeline
      </Typography>

      <Timeline sx={{ p: 0, m: 0 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />

              {index < 2 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>

            <TimelineContent>
              <Skeleton width="40%" />

              <Skeleton width="80%" />

              <Skeleton width="55%" />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
};