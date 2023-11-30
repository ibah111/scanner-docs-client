import { Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';
import useDocData from '../../../../hooks/useDocData';

export default function Title() {
  const dispatch = useAppDispatch();
  const data = useDocData('title');
  return (
    <Grid item xs={4}>
      <TextField
        label="Имя документа"
        onChange={(event) => {
          dispatch(setPropertyValue(['title', String(event.target.value)]));
        }}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
      />
    </Grid>
  );
}
