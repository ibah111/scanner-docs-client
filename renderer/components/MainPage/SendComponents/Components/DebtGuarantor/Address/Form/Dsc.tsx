import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from './useData';

export default function Dsc() {
  const { t } = useTranslation();
  const data = useData('dsc');
  return (
    <TextField
      label={t('form.address.dsc')}
      error={data.error}
      value={data.value}
      required={data.required}
      helperText={data.helperText}
      onChange={(event) => data.setValue(event.target.value)}
    />
  );
}
