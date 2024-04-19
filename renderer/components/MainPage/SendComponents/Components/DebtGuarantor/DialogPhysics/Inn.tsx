import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function Inn() {
  const data = useData('inn');
  const { t } = useTranslation();
  return (
    <Grid item xs={3}>
      <TextField
        label={t('form.debt_guarantor.inn')}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        inputProps={{ maxLength: 12 }}
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
