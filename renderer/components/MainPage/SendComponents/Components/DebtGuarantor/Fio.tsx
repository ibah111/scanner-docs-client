import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from './useData';

export default function Fio() {
  const { t } = useTranslation();
  const data = useData('fio');
  return (
    <Grid item xs={4}>
      <TextField
        label={t('form.debt_guarantor.fio')}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
