import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function BirthPlace() {
  const data = useData('birth_place');
  const { t } = useTranslation();
  return (
    <Grid item xs={12}>
      <TextField
        label={t('form.debt_guarantor.birth_place')}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        multiline
        onChange={(event) => data.setValue(event.target.value)}
      />
    </Grid>
  );
}
