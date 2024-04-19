import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function National() {
  const data = useData('string_value_2');
  const { t } = useTranslation();
  return (
    <Grid item xs={6}>
      <TextField
        value={data.value}
        label={t('form.debt_guarantor.string_value_2')}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
