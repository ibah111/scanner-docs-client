import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import React from 'react';
import TableRowsIcon from '@mui/icons-material/TableRows';
import {
  DataGridPremium,
  GridColDef,
  GridToolbarContainer,
} from '@mui/x-data-grid-premium';
import { useAppSelector } from '../../../../../../../Reducer';
import { enqueueSnackbar } from 'notistack';
import { BankRequisitesClass } from '../../../../../../../apiSend/BankRequisites/BankRequisitesInput';
import getAllBankRequisites from '../../../../../../../apiSend/BankRequisites/getAllBankRequisites';
import addBankRequisites from '../../../../../../../apiSend/BankRequisites/addBankRequisites';
import RequisitesForm from './RequisitesForm/RequisitesForm';

export default function RequisitsButton() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [rows, setRows] = React.useState<BankRequisitesClass[]>([]);
  const columns = RequisitsColumns();
  const handleOpen = React.useCallback(() => {
    setOpen(true);
    getAllBankRequisites().subscribe((result) => {
      setRows(result);
    });
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Tooltip title="Реквизиты">
        <IconButton onClick={() => handleOpen()}>
          <TableRowsIcon />
        </IconButton>
      </Tooltip>
      {
        <>
          <Dialog
            open={open}
            onClose={() => handleClose()}
            fullWidth
            maxWidth={'xl'}
            sx={{ width: '100%', height: '100%' }}
          >
            <DialogTitle>{`Реквизиты`}</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs>
                  <DataGridPremium
                    columns={columns}
                    rows={rows}
                    slots={{
                      toolbar: RequisitsToolbar,
                    }}
                    slotProps={{
                      toolbar: {},
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </>
      }
    </>
  );
}

function RequisitsToolbar() {
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

function RequisitsColumns(): GridColDef<BankRequisitesClass>[] {
  const columns: GridColDef<BankRequisitesClass>[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Название',
    },
    {
      field: 'recipient',
      headerName: 'Получатель',
    },
    {
      field: 'br_name',
      headerName: 'Банк получателя',
    },
    {
      field: 'inn',
      headerName: 'ИНН',
    },
    {
      field: 'kpp',
      headerName: 'КПП',
    },
    {
      field: 'r_account',
      headerName: 'Рассчётный счёт',
    },
    {
      field: 'k_account',
      headerName: 'Корр.счёт',
    },
    {
      field: 'bik',
      headerName: 'БИК',
    },
    {
      field: 'pay_purpose',
      headerName: 'Назначение платежа / ОГРНИП',
    },
    {
      field: 'typ',
      headerName: 'Тип реквизита',
    },
  ];
  return columns.map((items) => ({
    ...items,
    headerAlign: 'center',
    align: 'center',
  }));
}
