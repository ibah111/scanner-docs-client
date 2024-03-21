import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import getData from '../../../../../../../utils/getData';
import React from 'react';
import { useTranslation } from 'react-i18next';

const types = [
  { id: 0, name: 'Пенсионер' },
  { id: 1, name: 'ДС поступали' },
  { id: 2, name: 'выезд в адрес' },
];
export default function AppealTyp() {
  const { t } = useTranslation();
  const data = getData('appeal_typ', 'number', false, true);
  React.useEffect(() => {
    return () => data.setValue(null);
  }, []);
  return (
    <>
      <Grid sx={{ width: 200 }} item>
        <FormControl fullWidth error={data.isInvalid}>
          <InputLabel>{t('form.send.appeal_typ')}</InputLabel>
          <Select
            value={data.value}
            onChange={(event) => {
              data.setValue(event.target.value);
            }}
            label={t('form.send.appeal_typ')}
          >
            <MenuItem value={''}>{t('system.none')}</MenuItem>
            {types.map((type, index) => (
              <MenuItem key={index} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
