import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import printBarcode from '../../../lib/printBarcode';
import React from 'react';
import { enqueueSnackbar } from 'notistack';
interface PrintDialogInterface {
  open: boolean;
  onClose: VoidFunction;
  docId: number;
  docCode: string;
  titleCode: string;
}
export default function PrindDialog({
  onClose,
  open,
  docId,
  docCode,
  titleCode,
}: PrintDialogInterface) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
      <DialogTitle align="center">
        Документ: {docId}, Имя документа: {titleCode}
      </DialogTitle>
      <DialogContent>
        <Grid container columnSpacing={2}>
          <Grid xs={12} item>
            <Button
              fullWidth
              color="success"
              variant="contained"
              onClick={() => {
                printBarcode(String(docCode), `${titleCode}`).subscribe({
                  complete() {
                    onClose();
                    enqueueSnackbar('Распечатано', {
                      variant: 'success',
                    });
                  },
                  error() {
                    enqueueSnackbar('Подключите принтер', {
                      variant: 'warning',
                    });
                  },
                });
              }}
            >
              <Grid>Код документа: {docCode}</Grid>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
