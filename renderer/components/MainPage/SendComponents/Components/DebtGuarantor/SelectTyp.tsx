import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useDict from '../../../../../hooks/useDict';
import useData from './useData';
import { StyledHtmlTooltip } from '../../../../../Styles/Transtion';

export default function SelectTyp() {
  const dict = useDict(54);
  const data = useData('typ');
  const { t } = useTranslation();
  const helperText = data.helperText;
  return (
    <Grid item xs={2}>
      <StyledHtmlTooltip title={helperText}>
        <FormControl required={data.required} error={data.error}>
          <InputLabel id="select-typ-id">
            {t('form.debt_guarantor.typ')}
          </InputLabel>
          <Select
            labelId="select-typ-id"
            label={t('form.debt_guarantor.typ')}
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
