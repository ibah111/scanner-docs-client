import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';
import { StyledHtmlTooltip } from '../../../../../../Styles/Transtion';

export default function Position() {
  const data = useData('position');
  const { t } = useTranslation();
  const helperText = data.helperText;

  return (
    <Grid xs={6} item>
      <StyledHtmlTooltip title={helperText}>
        <TextField
          label={t('form.debt_guarantor.position')}
          value={data.value}
          required={data.required}
          error={data.error}
          onChange={(event) => data.setValue(event.target.value)}
        />
      </StyledHtmlTooltip>
      ;
    </Grid>
  );
}
