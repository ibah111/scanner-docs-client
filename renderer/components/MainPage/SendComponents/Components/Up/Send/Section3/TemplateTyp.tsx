import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';
const types = [
  { id: 16, name: 'ст.46 п.3' },
  { id: 17, name: 'ст.46 п.4' },
  { id: 30, name: 'ст.46 п.4 раньше срока' },
  { id: 34, name: 'ст.46 п.3 раньше срока' },
  { id: 41, name: 'Электронный' },
];
export default function TemplateTyp() {
  const { t } = useTranslation();
  const data = getData('template_typ', 'number');
  return (
    <>
      <Grid sx={{ width: 200 }} item>
        <FormControl fullWidth error={data.isInvalid}>
          <InputLabel>{t('form.send.template_typ')}</InputLabel>
          <Select
            value={data.value}
            onChange={(event) => {
              data.setValue(event.target.value);
            }}
            label={t('form.send.template_typ')}
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
