import { Grid } from '@mui/material';
import React from 'react';
import Address from './Address';
import RCourtId from './RCourtId';

export default function Section5() {
  return (
    <>
      <Grid
        container
        item
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <RCourtId />
        <Address />
      </Grid>
    </>
  );
}
