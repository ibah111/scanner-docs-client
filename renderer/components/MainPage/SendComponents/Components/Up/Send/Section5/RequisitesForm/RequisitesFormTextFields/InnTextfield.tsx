import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function InnTextField() {
  const inn = useAppSelector((state) => state.Requisites.inn);
  const data = useRequisitesData('inn', {
    inn,
  });
  return (
    <TextField
      fullWidth
      label="ИНН"
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
