import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useDict from '../../../../../../../hooks/useDict';
import useData from './useData';

export default function Typ() {
  const { t } = useTranslation();
  const data = useData('typ');
  const dict = useDict(5);
  const dictFilter = React.useMemo(
    () => dict.filter((item) => 100 <= item.code && item.code <= 200),
    [dict],
  );
  return (
    <FormControl required={data.required} error={data.error}>
      <InputLabel id="address-typ-label">{t('form.address.typ')}</InputLabel>
      <Select
        labelId="address-typ-label"
        value={data.value}
        label={t('form.address.typ')}
        onChange={(event) => data.setValue(event.target.value as number)}
      >
        {dictFilter.map((item) => (
          <MenuItem key={item.id} value={item.code}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{data.helperText}</FormHelperText>
    </FormControl>
  );
}
