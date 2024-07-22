import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function NameTextField() {
  const name = useAppSelector((state) => state.Requisites.name);
  const data = useRequisitesData('name', {
    name,
  });
  return (
    <TextField
      fullWidth
      label="Наименование"
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
