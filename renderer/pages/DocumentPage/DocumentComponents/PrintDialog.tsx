import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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
  const variants = ['29x42', '29x90', '62x29'];
  const [variant, setVariant] = React.useState<string>(variants[0]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
      <DialogTitle align="center">
        Документ: {docId}, Имя документа: {titleCode}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container columnSpacing={2}>
          <Grid xs={3} item>
            <FormControl fullWidth>
              <InputLabel id="barcode-type">Тип бумаги</InputLabel>
              <Select
                id="barcode-type"
                labelId="barcode-type"
                label="Тип бумаги"
                size="small"
                value={variant}
                onChange={(event) => {
                  const value = event.target.value;
                  setVariant(value);
                }}
              >
                {variants.map((name) => (
                  <MenuItem key={name} value={name}>
                    {`${name}mm`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={9} item>
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
