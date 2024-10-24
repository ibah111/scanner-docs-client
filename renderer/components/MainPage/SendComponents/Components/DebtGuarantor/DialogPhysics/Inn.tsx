import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';
import { StyledHtmlTooltip } from '../../../../../../Styles/Transtion';

export default function Inn() {
  const data = useData('inn');
  const { t } = useTranslation();
  const helperText = data.helperText;

  return (
    <Grid item xs={3}>
      <StyledHtmlTooltip title={helperText}>
        <TextField
          label={t('form.debt_guarantor.inn')}
          value={data.value}
          required={data.required}
          error={data.error}
          helperText={data.helperText}
          inputProps={{ maxLength: 12 }}
          onChange={(event) => data.setValue(event.target.value)}
        />
      </StyledHtmlTooltip>
    </Grid>
  );
}
