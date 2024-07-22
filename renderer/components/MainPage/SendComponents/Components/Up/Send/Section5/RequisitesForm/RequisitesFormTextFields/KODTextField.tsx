import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function KODTextField() {
  const kod = useAppSelector((state) => state.Requisites.kod);
  const data = useRequisitesData('kod', {
    kod,
  });
  return (
    <TextField
      fullWidth
      label="KOD"
      onChange={(event) => {
        const value = event.target.value;
        data.onChange(value);
      }}
      value={data.value}
      helperText={data.helperText}
    />
  );
}
