import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';
import { StyledHtmlTooltip } from '../../../../../../Styles/Transtion';

export default function National() {
  const data = useData('string_value_2');
  const { t } = useTranslation();
  const helperText = data.helperText;
  return (
    <Grid item xs={6}>
      <StyledHtmlTooltip title={helperText}>
        <TextField
          value={data.value}
          label={t('form.debt_guarantor.string_value_2')}
          required={data.required}
          error={data.error}
          onChange={(event) => data.setValue(event.target.value)}
        />
      </StyledHtmlTooltip>
      ;
    </Grid>
  );
}
