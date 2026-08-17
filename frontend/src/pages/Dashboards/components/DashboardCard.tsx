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
  color?: string;

  currency?: boolean;

  suffix?: string;
  prefix?: string;

  icon?: ReactNode;
}

export const DashboardCard = ({
  title,
  value,
  loading = false,
  color,
  currency = false,
  suffix,
  prefix,
  icon,
}: Props) => {
  const theme = useTheme();

  const accentColor = color ?? theme.palette.primary.main;

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
        position: "relative",
        height: "100%",
        minHeight: 136,

        borderRadius: 3,

        border: `1px solid ${theme.palette.divider}`,
        borderLeft: `6px solid ${accentColor}`,

        backgroundColor: theme.palette.background.paper,

        transition: "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 24px rgba(0,0,0,0.35)"
              : "0 8px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          ml: 1,
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
            sx={{
              fontSize: "0.95rem",
            }}
          >
            {title}
          </Typography>

          {icon && (
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                color: accentColor,

                backgroundColor:
                  theme.palette.mode === "dark"
                    ? `${accentColor}18`
                    : `${accentColor}12`,

                flexShrink: 0,

                "& svg": {
                  fontSize: 28,
                },
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {/* Value */}
        <Box sx={{ mt: 1 }}>
          {loading ? (
            <Skeleton
              variant="text"
              width="65%"
              height={48}
            />
          ) : (
            <Typography
              fontWeight={700}
              color={color ?? "text.primary"}
              sx={{
                lineHeight: 1.1,

                fontSize: {
                  xs: "1.9rem",
                  sm: currency ? "2rem" : "2.5rem",
                  md: currency ? "2.15rem" : "2.7rem",
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