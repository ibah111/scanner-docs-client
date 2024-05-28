import React from 'react';
import Send from '../../components/MainPage/SendComponents';
import { Grid } from '@mui/material';

export default function Main() {
  return (
    <>
      <Grid
        item
        xs
        container
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        sx={{ minHeight: 0, minWidth: 0 }}
      >
        <Send />
      </Grid>
    </>
  );
}
