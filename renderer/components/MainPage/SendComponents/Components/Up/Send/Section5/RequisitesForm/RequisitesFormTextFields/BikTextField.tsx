import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function BikTextField() {
  const bik = useAppSelector((state) => state.Requisites.bik);
  const data = useRequisitesData('bik', {
    bik,
  });
  return (
    <TextField
      fullWidth
      label="БИК"
      onChange={(event) => {
        const value = event.target.value;
        data.onChange(value);
      }}
      value={data.value}
      error={data.error}
      helperText={data.helperText}
    />
  );
}
