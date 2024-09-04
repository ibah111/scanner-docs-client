import { Grid, TextField } from '@mui/material';
import getData from '../../../../../../../utils/getData';

export default function ExecNumber() {
  const data = getData('exec_number');
  return (
    <>
      <Grid item>
        <TextField
          label="Номер дела в суде"
          value={data.value}
          onChange={(event) => data.setValue(event.target.value as string)}
          color="warning"
          focused
        />
      </Grid>
    </>
  );
}
