import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function KNPTextField() {
  const knp = useAppSelector((state) => state.Requisites.knp);
  const data = useRequisitesData('knp', {
    knp,
  });
  return (
    <TextField
      fullWidth
      label="KNP"
      onChange={(event) => {
        const value = event.target.value;
        data.onChange(value);
      }}
      value={data.value}
      helperText={data.helperText}
    />
  );
}
