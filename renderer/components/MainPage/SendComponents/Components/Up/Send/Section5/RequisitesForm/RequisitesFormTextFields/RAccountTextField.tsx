import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function RAccountTextField() {
  const r_account = useAppSelector((state) => state.Requisites.r_account);
  const data = useRequisitesData('r_account', {
    r_account,
  });
  return (
    <TextField
      fullWidth
      label="Расс.счёт"
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
