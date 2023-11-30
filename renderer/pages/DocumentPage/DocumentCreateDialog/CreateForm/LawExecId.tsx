import { Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';
import { NumericFormatCustom } from '../../../../utils/NumberFormatMask';

export default function LawExecId() {
  const dispatch = useAppDispatch();
  return (
    <Grid item xs={4}>
      <TextField
        label="ID ИД"
        onChange={(event) =>
          dispatch(setPropertyValue(['law_exec_id', event.target.value]))
        }
        inputProps={{
          inputComponent: NumericFormatCustom,
        }}
      />
    </Grid>
  );
}
