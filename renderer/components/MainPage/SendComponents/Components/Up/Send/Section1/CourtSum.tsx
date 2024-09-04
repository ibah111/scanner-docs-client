import { Grid, TextField } from '@mui/material';
import React from 'react';
import getData from '../../../../../../../utils/getData';
import { NumberFormatCustom } from './TotalSum';

export default function CourtSum() {
  const data = getData('court_sum', 'number');

  return (
    <>
      <Grid item>
        <TextField
          error={data.isInvalid}
          required
          label="Сумма по решению суда"
          value={data.value}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          onChange={(event) => {
            const value = Number(event.target.value);
            data.setValue(value);
          }}
        />
      </Grid>
    </>
  );
}
