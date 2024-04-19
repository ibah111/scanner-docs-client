import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function Contract() {
  const data = useData('contract');

  const { t } = useTranslation();
  return (
    <Grid item xs={6}>
      <TextField
        label={t('form.debt_guarantor.contract')}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
