import { Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';
import { NumericFormatCustom } from '../../../../utils/NumberFormatMask';

export default function ContactDocId() {
  const dispatch = useAppDispatch();
  return (
    <Grid item xs={4}>
      <TextField
        label="ID документа из контакта"
        onChange={(event) =>
          dispatch(setPropertyValue(['contact_doc_id', event.target.value]))
        }
        InputProps={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent: NumericFormatCustom as any,
        }}
      />
    </Grid>
  );
}
