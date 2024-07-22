import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useRequisitesData from '../../../../../../../../../hooks/useRequisitesData';
import { useAppSelector } from '../../../../../../../../../Reducer';

const types = [
  {
    id: 1,
    text: 'Для печати',
  },
];

export default function TypTextField() {
  const typ = useAppSelector((state) => state.Requisites.typ);
  const data = useRequisitesData('typ', {
    typ,
  });
  return (
    <FormControl>
      <InputLabel>Тип реквизитов</InputLabel>
      <Select
        error={data.error}
        value={data.value}
        onChange={(event) => {
          const value = event.target.value as number;
          data.onChange(value);
        }}
        label="Тип реквизитов"
      >
        <MenuItem value={0}>Не выбрано</MenuItem>
        {types.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
