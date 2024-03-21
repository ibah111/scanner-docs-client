import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function IdCard() {
  const data = useData('id_card');
  const { t } = useTranslation();
  return (
    <Grid item xs={4}>
      <TextField
        label={t('form.debt_guarantor.id_card')}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
