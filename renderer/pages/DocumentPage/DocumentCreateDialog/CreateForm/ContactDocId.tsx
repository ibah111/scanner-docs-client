import { Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';
import { NumericFormatCustom } from '../../../../utils/NumberFormatMask';
import useDocData from '../../../../hooks/useDocData';

export default function ContactDocId() {
  const dispatch = useAppDispatch();
  const data = useDocData('contact_doc_id');
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
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
      />
    </Grid>
  );
}
