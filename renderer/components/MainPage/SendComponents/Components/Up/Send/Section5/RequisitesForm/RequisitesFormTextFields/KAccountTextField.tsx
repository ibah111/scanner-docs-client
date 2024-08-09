import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function KAccountTextField() {
  const k_account = useAppSelector((state) => state.Requisites.k_account);
  const data = useRequisitesData('k_account', {
    k_account,
  });
  return (
    <TextField
      fullWidth
      label="Корр.счёт"
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
