import { Grid, TextField } from '@mui/material';
import getData from '../../../../../../../utils/getData';
import { NumberFormatCustom } from './TotalSum';

export default function DebtPaymentsSum() {
  const data = getData('debt_payments_sum', 'number', true, true);
  return (
    <>
      <Grid item>
        <TextField
          disabled
          value={data.value}
          label="Сумма платежей"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </Grid>
    </>
  );
}
