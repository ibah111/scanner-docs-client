import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function Company() {
  const data = useData('company_name');
  const { t } = useTranslation();
  return (
    <Grid item xs={6}>
      <TextField
        label={t('form.debt_guarantor.company_name')}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
