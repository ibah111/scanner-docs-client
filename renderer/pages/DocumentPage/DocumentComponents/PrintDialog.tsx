import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import printBarcode from '../../../lib/printBarcode';
interface PrintDialogInterface {
  open: boolean;
  onClose: VoidFunction;
}
export default function PrindDialog({ onClose, open }: PrintDialogInterface) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Печать кода:</DialogTitle>
      <DialogContent>
        <Grid container xs item>
          <Button
            onClick={() => {
              printBarcode(String(0));
            }}
          >
            Короба
          </Button>
          <Button
            onClick={() => {
              printBarcode(String(0));
            }}
          >
            Документ
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
