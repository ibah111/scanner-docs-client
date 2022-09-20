import { Box, Grid } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppSelector } from '../../Reducer';
import Scan from '../../components/Scan';
import SendingForm from '../../components/MainPage/sendingForm';
import columnsDoc from '../../components/MainPage/columnsDoc';
import columnsBarcode from '../../components/MainPage/columnsBarcode';

export default function Main() {
  const data = useAppSelector((state) => state.Data);
  const User = useAppSelector((state) => state.User);
  let rows;
  let columns;
  console.log(data);
  if (!Array.isArray(data)) {
    rows = data ? [data] : [];
    columns = columnsBarcode;
  } else {
    rows = data;
    columns = columnsDoc;
  }

  return (
    <Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        height="100%"
        spacing={3}
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          height="100%"
        >
          {rows.length > 0 && (
            <DataGridPremium
              autoHeight
              columns={columns}
              rows={rows}
              hideFooter
            />
          )}
        </Grid>
        <Grid item>
          {User.roles.includes('sender') && rows.length == 1 && <SendingForm />}
        </Grid>
        <Grid item>
          <Scan />
        </Grid>
      </Grid>
    </Box>
  );
}
