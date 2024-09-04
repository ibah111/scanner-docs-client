import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function BrAddressTextField() {
  const br_address = useAppSelector((state) => state.Requisites.br_address);
  const data = useRequisitesData('br_address', {
    br_address,
  });
  return (
    <TextField
      fullWidth
      label="Юр.адресс банка"
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
