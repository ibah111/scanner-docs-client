import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useDict from '../../../../../hooks/useDict';
import useData from './useData';
import { StyledHtmlTooltip } from '../../../../../Styles/Transtion';

/**
 * Поручитель - Роль
 */
export default function SelectRole() {
  const dict = useDict(155);
  const { t } = useTranslation();
  const data = useData('kind');
  const helperText = data.helperText;

  return (
    <Grid item xs={3}>
      <StyledHtmlTooltip title={helperText}>
        <FormControl required={data.required} error={data.error}>
          <InputLabel id="select-role-id">
            {t('form.debt_guarantor.kind')}
          </InputLabel>
          <Select
            labelId="select-role-id"
            label={t('form.debt_guarantor.kind')}
            value={data.value}
            onChange={(event) => data.setValue(event.target.value as number)}
          >
            {dict.map((item) => (
              <MenuItem key={item.id} value={item.code}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledHtmlTooltip>
    </Grid>
  );
}
