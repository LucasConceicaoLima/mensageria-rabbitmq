import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;

  loading?: boolean;

  onClose: () => void;

  onDelete: () => void;
}

export const DeleteProductDialog = ({
  open,
  loading,
  onClose,
  onDelete,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Excluir produto
      </DialogTitle>

      <DialogContent>
        <Typography>
          Tem certeza que deseja excluir
          este produto?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onDelete}
          disabled={loading}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};