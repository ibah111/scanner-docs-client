import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from './useData';

export default function ExtId() {
  const data = useData('ext_id');
  const { t } = useTranslation();
  return (
    <Grid item xs={2}>
      <TextField
        label={t('form.debt_guarantor.ext_id')}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(event.target.value)}
        value={data.value}
      />
    </Grid>
  );
}
