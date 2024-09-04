import React from 'react';
import { useAppSelector } from '../../../../../../../../Reducer';
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid-premium';
import { enqueueSnackbar } from 'notistack';
import { resetRequisitesState } from '../../../../../../../../Reducer/Requisites';
import RequisitesForm from './RequisitesForm';
import addBankRequisites from '../../../../../../../../apiSend/BankRequisites/addBankRequisites';

export default function RequisitsToolbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const requisitsBody = useAppSelector((state) => state.Requisites);
  return (
    <>
      <GridToolbarContainer>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            handleOpen();
          }}
        >
          Добавить реквизиты
        </Button>
      </GridToolbarContainer>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth={'md'}
          sx={{ width: '100%', height: '100%' }}
        >
          <DialogTitle>Добавление реквизитов</DialogTitle>
          <Divider />
          <DialogContent>
            <RequisitesForm />
          </DialogContent>
          <DialogActions>
            <Grid container>
              <Grid item container>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    addBankRequisites(requisitsBody).subscribe({
                      complete() {
                        setOpen(false);
                        enqueueSnackbar('Реквизиты добавлены', {
                          variant: 'success',
                        });
                        resetRequisitesState();
                      },
                    });
                  }}
                >
                  Добавить реквизит
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
