import {
  Card,
  CardContent,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

interface Props {
  title: string;
  value: number | string;
  loading?: boolean;
  color?: string;
}

export const DashboardCard = ({
  title,
  value,
  loading = false,
  color,
}: Props) => {
  const theme = useTheme();

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
      <CardContent sx={{ml: 2}}>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        {loading ? (
          <Skeleton
            width={90}
            height={50}
          />
        ) : (
          <Typography
            variant="h3"
            fontWeight={700}
            color={color}
          >
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};