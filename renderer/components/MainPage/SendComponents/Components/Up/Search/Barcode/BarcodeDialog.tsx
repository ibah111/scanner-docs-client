import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import { useAppSelector } from '../../../../../../../Reducer';
import React from 'react';
import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { Doc } from '../../../../../../../Schemas/Doc.model';

class BarcodeDialogoProps {
  open: boolean;
  closeFunction: VoidFunction;
}

export default function BarcodeDialog({
  open,
  closeFunction,
}: BarcodeDialogoProps) {
  const code_results = useAppSelector((state) => state.DocArray);
  React.useEffect(() => {
    console.log('code_results', code_results);
  }, []);
  return (
    <>
      <Dialog open={open} onClose={closeFunction} fullWidth>
        <DialogTitle>Данные по документу</DialogTitle>
        <Divider />
        <DialogContent>
          <Paper>
            <DataGridPremium
              columns={CustomColumns<Doc>(code_results)}
              rows={code_results}
            />
          </Paper>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Grid item xs container>
            <Grid item>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  closeFunction();
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
export function CustomColumns<T>(columns: T[]): GridColDef<T>[] {
  const CustomColumns: GridColDef<T>[] = [];
  for (const iterator of columns) {
    for (const key in iterator) {
      if (Object.prototype.hasOwnProperty.call(iterator, key)) {
        const value = iterator[key];
        CustomColumns.push({
          field: key,
          type: typeof value,
          valueGetter() {
            return value;
          },
        });
      }
    }
  }
  return CustomColumns.map((columns) => ({
    headerAlign: 'center',
    align: 'center',
    width: 150,
    ...columns,
  }));
}
