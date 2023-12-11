import { Grid, Typography } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppSelector } from '../../Reducer';
import SendingForm from '../../components/MainPage/sendingForm';
import columns from '../../components/MainPage/columns';
import CustomPagination from '../../components/Pagination/CustomPagination';
import { Can } from '../../casl/casl.factory';
import { Action, Subject } from '../../casl/casl';
import MainPageToolbar from './MainPageToolbar';

export default function Main() {
  const data = useAppSelector((state) => state.Data);
  const boxId = data[0]?.Box?.id;
  const boxUserName =
    data[0]?.Box?.User.f +
    ' ' +
    data[0]?.Box?.User.i +
    ' ' +
    data[0]?.Box?.User.o;
  const boxDepartName = data[0]?.Box?.Depart.title;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Grid
        item
        xs
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ minHeight: 0, minWidth: 0 }}
      >
        <Grid item sx={{ minHeight: 0, minWidth: 0 }}>
          {data.length > 1 && (
            <Typography sx={{ mt: 2, ml: 2, mb: 2 }}>
              <b>ID короба:</b> {boxId} <b>Предыдущий держатель:</b>{' '}
              {boxUserName} <b>Департамент:</b> {boxDepartName}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={data.length > 1 ? true : false}
          sx={{ minHeight: 0, minWidth: 0, height: '100%', width: '100%' }}
        >
          {data.length > 0 ? (
            <DataGridPremium
              sx={{
                width: '100%',
              }}
              autoHeight={data.length === 1}
              rows={data}
              columns={columns}
              slots={{
                toolbar: MainPageToolbar,
                pagination: CustomPagination,
              }}
              slotProps={{
                toolbar: { handleOpen },
              }}
              pagination
            />
          ) : (
            <Typography align={'center'} variant={'h4'} sx={{ pt: 5 }}>
              Подключите сканер штрих-кода и начните работу
            </Typography>
          )}
        </Grid>
        {data.length > 0 && (
          <Can I={Action.Manage} a={Subject.Barcode}>
            <SendingForm open={open} onClose={handleClose} />
          </Can>
        )}
      </Grid>
    </>
  );
}
