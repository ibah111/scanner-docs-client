import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useDict from '../../../../../../../hooks/useDict';
import getData from '../../../../../../../utils/getData';

export default function ExecutiveTyp() {
  const { t } = useTranslation();
  const dict = useDict(16);
  const data = getData('DELIVERY_TYP', 'string');
  return (
    <>
      <Grid sx={{ width: 220 }} item>
        <FormControl error={data.isInvalid} fullWidth>
          <InputLabel id="delivery_typ">
            {t('form.send.DELIVERY_TYP')}
          </InputLabel>
          <Select
            required
            value={data.value}
            onChange={(event) => {
              data.setValue(event.target.value);
            }}
            label={t('form.send.DELIVERY_TYP')}
          >
            <MenuItem value={''}>{t('system.none')}</MenuItem>
            {dict.map((type, index) => (
              <MenuItem key={index} value={type.code}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
