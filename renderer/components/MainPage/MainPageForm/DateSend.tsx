import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import useSendData from '../../../hooks/useSendData';
import moment from 'moment';

export default function DateSend() {
  const data = useSendData('DateSend');
  return (
    <Grid xs={2} item>
      <DatePicker
        label="Дата отправки"
        value={data.value || null}
        minDate={moment()}
        onChange={(v) => {
          if (typeof v === 'string') {
            return;
          } else {
            data.onChange(v);
          }
        }}
        slotProps={{
          textField: {
            error: data.error,
            helperText: data.helperText,
            required: data.required,
          },
        }}
      />
    </Grid>
  );
}
