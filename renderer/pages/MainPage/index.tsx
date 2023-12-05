import { Grid, Typography } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppSelector } from '../../Reducer';
import SendingForm from '../../components/MainPage/sendingForm';
import columns from '../../components/MainPage/columns';
import { CustomToolbar } from '../../components/CustomToolbar';
import CustomPagination from '../../components/Pagination/CustomPagination';
import { Can } from '../../casl/casl.factory';
import { Action, Subject } from '../../casl/casl';

export default function Main() {
  const data = useAppSelector((state) => state.Data);
  const User = useAppSelector((state) => state.User);
  const boxId = data[0]?.Box?.id;
  const boxUserName =
    data[0]?.Box?.User.f +
    ' ' +
    data[0]?.Box?.User.i +
    ' ' +
    data[0]?.Box?.User.o;
  const boxDepartName = data[0]?.Box?.Depart.title;
  return (
    <>
      <Grid
        item
        xs
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ width: '100vw' }}
      >
        <Grid item sx={{ width: '100vw' }}>
          {data.length > 1 && (
            <Typography sx={{ mt: 2, ml: 2, mb: 2 }}>
              <b>ID короба:</b> {boxId} <b>Предыдущий держатель:</b>{' '}
              {boxUserName} <b>Департамент:</b> {boxDepartName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={data.length > 1 ? true : false} sx={{ width: '100vw' }}>
          {data.length > 0 ? (
            <DataGridPremium
              autoHeight={data.length === 1}
              rows={data}
              columns={columns}
              sx={{ pl: 2 }}
              slots={{
                toolbar: CustomToolbar,
                pagination: CustomPagination,
              }}
              pagination
            />
          ) : (
            <Typography align={'center'} variant={'h4'} sx={{ pt: 5 }}>
              Подключите сканер штрих-кода и начните работу
            </Typography>
          )}
        </Grid>
        <Grid item sx={{ pt: 5 }}>
          {data.length > 0 && (
            <Can I={Action.Manage} a={Subject.Barcode}>
              <SendingForm />
            </Can>
          )}
        </Grid>
      </Grid>
    </>
  );
}
