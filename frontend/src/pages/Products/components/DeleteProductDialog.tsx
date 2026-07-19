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
        Delete Product
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete
          this product?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onDelete}
          disabled={loading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};