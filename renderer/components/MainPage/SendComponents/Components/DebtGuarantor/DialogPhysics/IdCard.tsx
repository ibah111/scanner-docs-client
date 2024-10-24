import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';
import { StyledHtmlTooltip } from '../../../../../../Styles/Transtion';

export default function IdCard() {
  const data = useData('id_card');
  const { t } = useTranslation();
  const helperText = data.helperText;
  return (
    <Grid item xs={4}>
      <StyledHtmlTooltip title={helperText}>
        <TextField
          label={t('form.debt_guarantor.id_card')}
          value={data.value}
          required={data.required}
          error={data.error}
          onChange={(event) => data.setValue(event.target.value)}
        />
      </StyledHtmlTooltip>
    </Grid>
  );
}
