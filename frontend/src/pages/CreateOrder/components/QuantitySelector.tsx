import {
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
}: Props) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
    >
      <IconButton
        size="small"
        onClick={onDecrease}
      >
        <RemoveIcon />
      </IconButton>

      <Typography width={25} textAlign="center">
        {quantity}
      </Typography>

      <IconButton
        size="small"
        onClick={onIncrease}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
};