import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import { setBox } from '../../Reducer/Box';
import createCode from '../../api/createCode';
import { useGridApiContext, useGridSelector } from '@mui/x-data-grid-premium';
import { GridStatePremium } from '@mui/x-data-grid-premium/models/gridStatePremium';
import React from 'react';

interface PrintCodesButtonProps {
  refresh: VoidFunction;
}

export default function PrintCodesButton({ refresh }: PrintCodesButtonProps) {
  const dispatch = useAppDispatch();
  const gridApi = useGridApiContext();
  const rows = useGridSelector(
    gridApi,
    (state: GridStatePremium) => state.rowSelection,
  ) as number[];
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const disabledCondition = (): boolean => {
    if (rows.length > 0) return false;
    return true;
  };
  const [boxTitle, setBoxTitle] = React.useState<string>('');

  return (
    <>
      <Button
        onClick={() => handleOpen()}
        color="primary"
        variant="contained"
        size="small"
        disabled={disabledCondition()}
      >
        {`Печать короб(а)`}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>
            <Grid>
              <TextField
                onChange={(event) => {
                  setBoxTitle(event.target.value as string);
                }}
                value={boxTitle}
              />
            </Grid>
            <Grid>
              <Typography>{`Распечатать коды: ${rows}?`}</Typography>
            </Grid>
          </DialogTitle>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(setBox(['create', true]));
                createCode(rows, boxTitle)
                  .then(() => handleClose())
                  .then(() => refresh());
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
