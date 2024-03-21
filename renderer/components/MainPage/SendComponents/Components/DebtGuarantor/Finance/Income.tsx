import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NumberFormatCustom } from '../../Up/Send/Section1/TotalSum';
import useData from '../useData';

export default function Income() {
  const data = useData('number_value_1');
  const { t } = useTranslation();
  return (
    <Grid item xs={6}>
      <TextField
        label={t('form.debt_guarantor.number_value_1')}
        type="number"
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(Number(event.target.value))}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </Grid>
  );
}
