import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function KppTextField() {
  const kpp = useAppSelector((state) => state.Requisites.kpp);
  const data = useRequisitesData('kpp', {
    kpp,
  });
  return (
    <TextField
      fullWidth
      label="КПП"
      onChange={(event) => {
        const value = event.target.value;
        data.onChange(value);
      }}
      value={data.value}
      helperText={data.helperText}
      error={data.error}
    />
  );
}
