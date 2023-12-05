import { Grid, TextField } from '@mui/material';
import useSendData from '../../../hooks/useSendData';

export default function WhereSend() {
  const data = useSendData('WhereSend');
  return (
    <Grid xs={2} item>
      <TextField
        label="Назначение"
        type="string"
        onChange={(event) => {
          data.onChange(event.target.value);
        }}
        value={data.value}
        helperText={data.helperText}
        error={data.error}
        required={data.required}
      />
    </Grid>
  );
}
