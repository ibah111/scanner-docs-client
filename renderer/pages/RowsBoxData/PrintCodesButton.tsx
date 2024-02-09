import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
import InfoAdornment from './addons/InfoAdornment';

const trueHelper = `Четко.`;
const falseHelper = `Наименование должно превышать длину в 10 символов`;
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

  const buttonCondition = (value: string): boolean => {
    if (value.length > 10) return false;
    return true;
  };

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
      <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
        <DialogContent>
          <DialogTitle>
            <Grid alignItems={'center'}>
              <Typography align="center">{`Распечатать коды: ${rows}?`}</Typography>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid>
              <TextField
                fullWidth
                label={'Наименование короба'}
                onChange={(event) => {
                  setBoxTitle(event.target.value as string);
                }}
                value={boxTitle}
                multiline
                InputProps={{
                  endAdornment: <InfoAdornment />,
                }}
                error={buttonCondition(boxTitle) ? true : false}
                helperText={
                  buttonCondition(boxTitle) ? falseHelper : trueHelper
                }
              />
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Grid>
              <Button
                disabled={buttonCondition(boxTitle)}
                variant="contained"
                onClick={() => {
                  dispatch(setBox(['create', true]));
                  createCode(rows, boxTitle)
                    .then(() => handleClose())
                    .then(() => refresh());
                }}
              >
                Печать
              </Button>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
