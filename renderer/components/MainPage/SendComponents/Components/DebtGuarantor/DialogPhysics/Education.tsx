import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useDict from '../../../../../../hooks/useDict';
import useData from '../useData';

export default function Education() {
  const data = useData('education');
  const dict = useDict(38);
  const { t } = useTranslation();
  return (
    <Grid item xs={6}>
      <FormControl required={data.required} error={data.error}>
        <InputLabel id="education-label">
          {t('form.debt_guarantor.education')}
        </InputLabel>
        <Select
          labelId="education-label"
          label={t('form.debt_guarantor.education')}
          value={data.value}
          onChange={(event) => data.setValue(event.target.value as number)}
        >
          {dict.map((item) => (
            <MenuItem key={item.id} value={item.code}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{data.helperText}</FormHelperText>
      </FormControl>
    </Grid>
  );
}
