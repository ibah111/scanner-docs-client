import { Box, Grid } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppSelector } from '../../Reducer';
import Scan from '../../components/Scan';
import SendingForm from '../../components/MainPage/sendingForm';
import columns from '../../components/MainPage/columns';

export default function Main() {
  const data = useAppSelector((state) => state.Data);
  const User = useAppSelector((state) => state.User);
  return (
    <Grid item xs sx={{ flexGrow: 1, width: '100vw' }}>
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
            {data.length > 0 && (
              <DataGridPremium
                sx={{ pl: 3, pr: 3, pt: 2, height: '100%' }}
                autoHeight
                columns={columns}
                rows={data}
                hideFooter
              />
            )}
          </Grid>
          <Grid item>
            {User.roles.includes('sender') && data.length == 1 && (
              <SendingForm />
            )}
          </Grid>
          <Grid item>
            <Scan />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
