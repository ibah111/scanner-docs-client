import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';
import { StyledHtmlTooltip } from '../../../../../../Styles/Transtion';

export default function Passport() {
  const data = useData('passport');
  const { t } = useTranslation();
  const helperText = data.helperText;

  return (
    <Grid item xs={12}>
      <StyledHtmlTooltip title={helperText}>
        <TextField
          label={t('form.debt_guarantor.passport')}
          value={data.value}
          required={data.required}
          error={data.error}
          multiline
          onChange={(event) => data.setValue(event.target.value)}
        />
      </StyledHtmlTooltip>
      ;
    </Grid>
  );
}
