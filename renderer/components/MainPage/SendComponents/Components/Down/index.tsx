import { Grid } from '@mui/material';
import React from 'react';
import Results from './Results';

export default function Down() {
  return (
    <>
      <Grid
        container
        item
        xs
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Results />
      </Grid>
    </>
  );
}
