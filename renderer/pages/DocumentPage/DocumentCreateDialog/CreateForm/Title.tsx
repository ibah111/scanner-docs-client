import { Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';

export default function Title() {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.Doc.title);
  return (
    <Grid item xs={4}>
      <TextField
        label="Имя документа"
        value={title || ''}
        onChange={(event) =>
          dispatch(setPropertyValue(['title', event.target.value]))
        }
      />
    </Grid>
  );
}
