import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';

export default function QualityCoeff() {
  const data = useData('quality_coeff');
  const { t } = useTranslation();
  return (
    <Grid item xs={6}>
      <TextField
        label={t('form.debt_guarantor.quality_coeff')}
        type="number"
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        value={data.value}
        onChange={(event) => data.setValue(Number(event.target.value))}
      />
    </Grid>
  );
}
