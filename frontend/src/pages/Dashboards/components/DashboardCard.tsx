import {
  Card,
  CardContent,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

import { formatCurrencyBrlCompact } from "../../../utils/formatCurrencyBrlCompact";

interface Props {
  title: string;
  value: number | string;
  loading?: boolean;
  color?: string;

  currency?: boolean;

  suffix?: string;
  prefix?: string;
}

export const DashboardCard = ({
  title,
  value,
  loading = false,
  color,
  currency = false,
  suffix,
  prefix,
}: Props) => {
  const theme = useTheme();

  let displayValue: string | number = value;

  if (currency && typeof value === "number") {
    displayValue = formatCurrencyBrlCompact(value);
  }

  if (!currency) {
    displayValue = `${prefix ?? ""}${displayValue}${suffix ?? ""}`;
  }

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: 3,
        transition: "0.25s",
        borderLeft: `6px solid ${
          color ?? theme.palette.primary.main
        }`,
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent sx={{ ml: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        {loading ? (
          <Skeleton width={90} height={50} />
        ) : (
          <Typography
            variant="h3"
            fontWeight={700}
            color={color}
            sx={{
              lineHeight: 1.1,
              wordBreak: "break-word",
              fontSize: {
                xs: "1.8rem",
                md: currency ? "2rem" : "3rem",
              },
            }}
          >
            {displayValue}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}