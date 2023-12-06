import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import { setBox } from '../../Reducer/Box';
import createCode from '../../api/createCode';
import { useGridApiContext, useGridSelector } from '@mui/x-data-grid-premium';
import { GridStatePremium } from '@mui/x-data-grid-premium/models/gridStatePremium';
import React from 'react';

export default function PrintCodesButton() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.RowDoc);
  const disabledCondition = (data: number): boolean => {
    if (data > 0) return false;
    return true;
  };
  const gridApi = useGridApiContext();
  const rows = useGridSelector(
    gridApi,
    (state: GridStatePremium) => state.rowSelection,
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        onClick={() => handleOpen()}
        color="primary"
        variant="contained"
        size="small"
        disabled={disabledCondition(data.rows.length)}
      >
        {`Создать короб(а)`}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>
            <Grid>
              <Typography>{`Распечатать коды: ${rows}?`}</Typography>
            </Grid>
          </DialogTitle>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(setBox(['create', true]));
                createCode().then(() => handleClose());
              }}
            >
              Печать
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
