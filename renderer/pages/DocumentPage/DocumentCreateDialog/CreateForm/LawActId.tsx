import { Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';
import { NumericFormatCustom } from '../../../../utils/NumberFormatMask';
import useDocData from '../../../../hooks/useDocData';

export default function LawActId() {
  const dispatch = useAppDispatch();
  const data = useDocData('law_act_id');
  return (
    <Grid item xs={4}>
      <TextField
        label="ID Суд. иска/приказа"
        onChange={(event) =>
          dispatch(setPropertyValue(['law_act_id', Number(event.target.value)]))
        }
        InputProps={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent: NumericFormatCustom as any,
        }}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
      />
    </Grid>
  );
}
