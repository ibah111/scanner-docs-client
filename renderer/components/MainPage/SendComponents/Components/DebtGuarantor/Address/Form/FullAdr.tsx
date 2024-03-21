import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from './useData';

export default function FullAdr() {
  const { t } = useTranslation();
  const data = useData('full_adr');
  return (
    <TextField
      label={t('form.address.full_adr')}
      error={data.error}
      value={data.value}
      required={data.required}
      helperText={data.helperText}
      onChange={(event) => data.setValue(event.target.value)}
    />
  );
}
