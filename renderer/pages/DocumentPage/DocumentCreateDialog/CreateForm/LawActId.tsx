import { Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';

export default function LawActId() {
  const dispatch = useAppDispatch();
  return (
    <Grid item xs={4}>
      <TextField
        label="ID Суд. иска/приказа"
        onChange={(event) =>
          dispatch(setPropertyValue(['law_act_id', event.target.value]))
        }
      />
    </Grid>
  );
}
