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

export default function FamilyStatus() {
  const dict = useDict(12);
  const data = useData('family_status');
  const { t } = useTranslation();
  return (
    <Grid item xs={3}>
      <FormControl required={data.required} error={data.error}>
        <InputLabel id="family-status-label">
          {t('form.debt_guarantor.family_status')}
        </InputLabel>
        <Select
          labelId="family-status-label"
          label={t('form.debt_guarantor.family_status')}
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
