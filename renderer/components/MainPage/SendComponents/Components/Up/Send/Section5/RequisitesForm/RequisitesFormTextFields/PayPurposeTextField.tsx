import { TextField } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

export default function PayPurposeTextField() {
  const pay_purpose = useAppSelector((state) => state.Requisites.pay_purpose);
  const data = useRequisitesData('pay_purpose', {
    pay_purpose,
  });
  return (
    <TextField
      fullWidth
      label="Назначение платежа / ОГРНИП"
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
