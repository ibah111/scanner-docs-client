import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useDict from '../../../../../../hooks/useDict';
import useData from '../useData';
import { StyledHtmlTooltip } from '../../../../../../Styles/Transtion';

export default function Sex() {
  const dict = useDict(285);
  const data = useData('sex');
  const { t } = useTranslation();
  const helperText = data.helperText;

  return (
    <Grid item xs={2}>
      <StyledHtmlTooltip title={helperText}>
        <FormControl required={data.required} error={data.error}>
          <InputLabel id={'sex-label'}>
            {t('form.debt_guarantor.sex')}
          </InputLabel>
          <Select
            labelId="sex-label"
            label={t('form.debt_guarantor.sex')}
            value={data.value}
            onChange={(event) => data.setValue(event.target.value)}
          >
            {dict.map((item) => (
              <MenuItem key={item.id} value={String(item.code)}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledHtmlTooltip>
    </Grid>
  );
}
