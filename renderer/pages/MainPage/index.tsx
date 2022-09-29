import { Grid, Typography } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppSelector } from '../../Reducer';
import SendingForm from '../../components/MainPage/sendingForm';
import columns from '../../components/MainPage/columns';

export default function Main() {
  const data = useAppSelector((state) => state.Data);
  const User = useAppSelector((state) => state.User);
  return (
    <>
      <Grid
        item
        xs
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        width="100vw"
        spacing={2}
      >
        <Grid item xs={data.length > 1 ? true : false} width="100vw">
          {data.length > 0 ? (
            <DataGridPremium
              autoHeight={data.length === 1}
              rows={data}
              columns={columns}
              sx={{ pl: 2 }}
              hideFooter
            />
          ) : (
            <Typography align={'center'} variant={'h4'} sx={{ pt: 5 }}>
              Подключите сканер штрих-кода и начните работу
            </Typography>
          )}
        </Grid>
        <Grid item>
          {User.roles.includes('sender') && data.length == 1 && <SendingForm />}
        </Grid>
      </Grid>
    </>
  );
}
