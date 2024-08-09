import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function KBETextField() {
  const kbe = useAppSelector((state) => state.Requisites.kbe);
  const data = useRequisitesData('kbe', {
    kbe,
  });
  return (
    <TextField
      fullWidth
      label="KBE"
      onChange={(event) => {
        const value = event.target.value;
        data.onChange(value);
      }}
      value={data.value}
      helperText={data.helperText}
    />
  );
}
