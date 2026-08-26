import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

import type { ReactNode } from "react";

import { formatCurrencyBrlCompact } from "../../../utils/formatCurrencyBrlCompact";

interface Props {
  title: string;
  value: number | string;
  loading?: boolean;

  currency?: boolean;

  suffix?: string;
  prefix?: string;

  icon?: ReactNode;
}

export const DashboardCard = ({
  title,
  value,
  loading = false,
  currency = false,
  suffix,
  prefix,
  icon,
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
      elevation={0}
      sx={{
        height: "100%",
        minHeight: 136,

        borderRadius: 2,

        border: "1px solid",
        borderColor: "divider",

        backgroundColor: "background.paper",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          p: 2.5,

          "&:last-child": {
            pb: 2.5,
          },

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={500}
          >
            {title}
          </Typography>

          {icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                color: "primary.main",

                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(144, 202, 249, 0.12)"
                    : "rgba(25, 118, 210, 0.08)",

                flexShrink: 0,

                "& svg": {
                  fontSize: 24,
                },
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {/* Value */}
        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Skeleton
              variant="text"
              width="65%"
              height={48}
            />
          ) : (
            <Typography
              fontWeight={600}
              color="text.primary"
              sx={{
                lineHeight: 1.1,

                fontSize: {
                  xs: "1.9rem",
                  sm: currency ? "2rem" : "2.3rem",
                  md: currency ? "2.1rem" : "2.5rem",
                },

                letterSpacing: "-0.02em",

                overflowWrap: "anywhere",
              }}
            >
              {displayValue}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};