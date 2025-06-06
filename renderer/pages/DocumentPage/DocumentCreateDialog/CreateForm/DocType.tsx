import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useAppDispatch } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';
import useDocData from '../../../../hooks/useDocData';
import useAsyncMemo from '../../../../utils/useAsyndMemo';
import getDocTypes from '../../../../api/TypesApi/getDocTypes';

export default function DocType() {
  const dispatch = useAppDispatch();
  const doc_types = useAsyncMemo(
    getDocTypes,
    [],
    [
      {
        id: 0,
        name: '',
        title: '',
      },
    ],
  );
  const data = useDocData('doc_type');
  return (
    <Grid item xs={4}>
      <FormControl id="doc_type" fullWidth error={data.error}>
        <InputLabel>Тип документа</InputLabel>
        <Select
          id="doc_type"
          labelId="Тип документа"
          label="Тип документа"
          onChange={(event) =>
            dispatch(setPropertyValue(['doc_type', Number(event.target.value)]))
          }
          value={data.value}
          required={data.required}
          error={data.error}
        >
          <MenuItem value={0} key={0}>
            Нет
          </MenuItem>
          {doc_types.map((i) => (
            <MenuItem value={i.id} key={i.id}>
              {i.title}
            </MenuItem>
          ))}
        </Select>
        {data.helperText && <FormHelperText>{data.helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  );
}
