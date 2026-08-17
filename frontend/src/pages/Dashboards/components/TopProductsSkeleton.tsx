import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export const TopProductsSkeleton = () => (
  <Card
    elevation={3}
    sx={{
      borderRadius: 3,
    }}
  >
    <CardContent
      sx={{
        m: 2,
        p: 0,
        "&:last-child": {
          pb: 0,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Skeleton
          variant="text"
          width={210}
          height={32}
        />

        <Skeleton
          variant="text"
          width={280}
          height={24}
          sx={{ mt: 0.3 }}
        />
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton
                variant="text"
                width={70}
                height={24}
              />
            </TableCell>

            <TableCell align="right">
              <Skeleton
                variant="text"
                width={60}
                height={24}
              />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  {/* Ranking */}
                  <Skeleton
                    variant="text"
                    width={24}
                    height={24}
                  />

                  {/* Product name */}
                  <Skeleton
                    variant="text"
                    width={140}
                    height={24}
                  />
                </Box>
              </TableCell>

              {/* Quantity */}
              <TableCell align="right">
                <Skeleton
                  variant="text"
                  width={35}
                  height={24}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);