import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { BoxTypes } from '../../../../../../../Schemas/BoxTypes.model';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../Reducer';
import { setSendDocProperty } from '../../../../../../../Reducer/SendDoc';
import getAllBoxTypes from '../../../../../../../api/Box/getAllBoxTypes';

export default function BoxTypeSelect() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.SendDoc.BoxTypeId);
  const [types, setTypes] = React.useState<BoxTypes[]>([]);

  const callback = React.useCallback(() => {
    getAllBoxTypes().subscribe((value) => {
      setTypes(value);
    });
  }, []);
  React.useEffect(() => {
    callback();
  }, [callback]);
  return (
    <Grid sx={{ width: 200 }} item>
      <FormControl fullWidth>
        <InputLabel id="boxTypeId">Тип короба</InputLabel>
        <Select
          labelId="boxTypeId"
          label="Тип короба"
          value={value}
          size="small"
          onChange={(event) => {
            const value = event.target.value as number;
            dispatch(setSendDocProperty(['BoxTypeId', value]));
          }}
        >
          <MenuItem>{'(0) Подано'}</MenuItem>
          {types.map((items) => (
            <MenuItem value={items.id} key={items.id}>
              {`(${items.id}) ${items.title}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
