import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';
import { StyledHtmlTooltip } from '../../../../../../Styles/Transtion';

export default function Company() {
  const data = useData('company_name');
  const { t } = useTranslation();
  const helperText = data.helperText;
  return (
    <Grid item xs={6}>
      <StyledHtmlTooltip title={helperText}>
        <TextField
          label={t('form.debt_guarantor.company_name')}
          value={data.value}
          required={data.required}
          error={data.error}
          onChange={(event) => data.setValue(event.target.value)}
        />
      </StyledHtmlTooltip>
    </Grid>
  );
}
