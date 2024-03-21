import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function Position() {
  const data = useData('position');
  const { t } = useTranslation();
  return (
    <Grid xs={6} item>
      <TextField
        label={t('form.debt_guarantor.position')}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
