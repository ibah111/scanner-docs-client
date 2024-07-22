import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import getData from '../../../../../../../utils/getData';
import { BankRequisitesClass } from '../../../../../../../apiSend/BankRequisites/BankRequisitesInput';
import getAllBankRequisites from '../../../../../../../apiSend/BankRequisites/getAllBankRequisites';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 410,
    },
  },
};

export default function Requisits() {
  const label = 'Реквизиты';
  const [requisitsArray, setRequisitsArray] = React.useState<
    BankRequisitesClass[]
  >([]);
  const data = getData('custom_requisites_id', 'number', true, true);

  React.useEffect(() => {
    getAllBankRequisites().subscribe((requisits) => {
      setRequisitsArray(requisits);
    });
  }, []);
  return (
    <>
      <Grid sx={{ width: 410 }} item>
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            value={data.value}
            label={label}
            onChange={(event) => {
              const selectValue = event.target.value as number;
              data.setValue(selectValue);
            }}
            MenuProps={MenuProps}
          >
            <MenuItem value={''}>Исход. реквизиты</MenuItem>
            {requisitsArray.map((type, index) => (
              <MenuItem key={index} value={type.id}>{`(${type.id}) ${
                type.recipient
              } ${type.br_name} ${
                type.br_address ? type.br_address : ''
              }`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
