import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
} from '@mui/material';
import printBarcode from '../../../lib/printBarcode';
import React from 'react';
interface PrintDialogInterface {
  open: boolean;
  onClose: VoidFunction;
  docId: number;
}
export default function PrindDialog({
  onClose,
  open,
  docId,
}: PrintDialogInterface) {
  const [boxCode, setBoxCode] = React.useState<number>();
  const [docCode, setDocCode] = React.useState<number>();
  const condition = (box: number): boolean => {
    if (box) return false;
    return true;
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
      <DialogTitle align="center">Документ: {docId}, Печать кода:</DialogTitle>
      <DialogContent>
        <Grid container columnSpacing={2}>
          <Grid xs item>
            <Button
              fullWidth
              color="success"
              variant="contained"
              onClick={() => {
                printBarcode(String(docCode)).subscribe({
                  complete: () => {},
                  error: () => {},
                  next: () => {},
                });
              }}
            >
              <Grid>Документ: {docCode}</Grid>
            </Button>
          </Grid>
          <Grid xs item>
            <Tooltip title="Если кнопка деактивирована, то клиент не получил код короба">
              <Button
                disabled={condition}
                fullWidth
                variant="contained"
                onClick={() => {
                  printBarcode(String(boxCode)).subscribe({
                    complete: () => {},
                    error: () => {},
                    next: () => {},
                  });
                }}
              >
                <Grid>Короба: {boxCode}</Grid>
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
