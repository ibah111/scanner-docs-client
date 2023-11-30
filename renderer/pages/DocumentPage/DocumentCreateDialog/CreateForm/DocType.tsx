import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useAppDispatch } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';

export default function DocType() {
  const dispatch = useAppDispatch();
  const doc_types = [
    {
      id: 1,
      name: 'Коробка',
      title: 'box',
    },
    {
      id: 2,
      name: 'Не коробка',
      title: 'box',
    },
  ];
  return (
    <Grid item xs={4}>
      <FormControl id="doc_type" fullWidth>
        <InputLabel>Тип документа</InputLabel>
        <Select
          id="doc_type"
          labelId="Тип документа"
          label="Тип документа"
          onChange={(event) =>
            dispatch(
              setPropertyValue(['doc_type', event.target.value as number]),
            )
          }
        >
          {doc_types.map((i) => (
            <MenuItem value={i.id} key={i.id}>
              {i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
