import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function RecipientTextField() {
  const recipient = useAppSelector((state) => state.Requisites.recipient);
  const data = useRequisitesData('recipient', {
    recipient,
  });
  return (
    <TextField
      fullWidth
      label="Получатель"
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
