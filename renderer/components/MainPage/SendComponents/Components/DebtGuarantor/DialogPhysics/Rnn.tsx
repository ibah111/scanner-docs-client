import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function Rnn() {
  const data = useData('tin');
  const { t } = useTranslation();
  return (
    <Grid item xs={3}>
      <TextField
        label={t('form.debt_guarantor.tin')}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
