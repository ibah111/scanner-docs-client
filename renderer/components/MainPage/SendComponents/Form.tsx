import { Box, Grid } from '@mui/material';
import React from 'react';
import Up from './Components/Up';
import Down from './Components/Down';

export default function Form() {
  return (
    <>
      <Box sx={{ height: '90vh' }}>
        <Grid
          height={'100%'}
          container
          maxWidth="100vw"
          item
          spacing={1}
          direction="column"
          alignItems="center"
          sx={{
            padding: '10px',
          }}
        >
          <Up />
          <Down />
        </Grid>
      </Box>
    </>
  );
}
