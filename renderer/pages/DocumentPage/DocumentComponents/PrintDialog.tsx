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
  docCode: string;
  boxCode: string;
  titleCode: string;
}
export default function PrindDialog({
  onClose,
  open,
  docId,
  boxCode,
  docCode,
  titleCode,
}: PrintDialogInterface) {
  const condition = (box: string): boolean => {
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
                printBarcode(
                  String(docCode),
                  `Документ:\n${titleCode}`,
                ).subscribe({
                  next: () => onClose(),
                });
              }}
            >
              <Grid>Документ: {docCode}</Grid>
            </Button>
          </Grid>
          <Grid xs item>
            <Tooltip title="Если кнопка деактивирована, то клиент не получил код короба">
              <Button
                disabled={condition(boxCode)}
                fullWidth
                variant="contained"
                onClick={() => {
                  printBarcode(
                    String(boxCode),
                    `Короб:\n${titleCode}`,
                  ).subscribe({
                    next: () => onClose(),
                  });
                }}
              >
                <Grid>
                  {boxCode ? `Короб: ${boxCode}` : 'Док. не в коробе'}
                </Grid>
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
