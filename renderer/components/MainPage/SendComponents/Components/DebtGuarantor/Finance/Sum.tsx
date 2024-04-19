import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NumberFormatCustom } from '../../Up/Send/Section1/TotalSum';
import useData from '../useData';

export default function Sum() {
  const data = useData('sum');
  const { t } = useTranslation();
  return (
    <Grid item xs={4}>
      <TextField
        label={t('form.debt_guarantor.sum')}
        value={data.value}
        onChange={(event) => data.setValue(Number(event.target.value))}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </Grid>
  );
}
