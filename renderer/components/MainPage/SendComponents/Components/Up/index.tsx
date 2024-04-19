import { Grid } from '@mui/material';
import React from 'react';
import Search from './Search';
import Send from './Send';

export default function Up() {
  return (
    <>
      <Grid
        container
        item
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Search />
        <Send />
      </Grid>
    </>
  );
}
