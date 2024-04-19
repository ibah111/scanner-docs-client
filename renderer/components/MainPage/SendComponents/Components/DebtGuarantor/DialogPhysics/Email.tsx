import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function Email() {
  const data = useData('string_value_1');
  const { t } = useTranslation();
  return (
    <Grid item xs={6}>
      <TextField
        label={t('form.debt_guarantor.string_value_1')}
        value={data.value}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
