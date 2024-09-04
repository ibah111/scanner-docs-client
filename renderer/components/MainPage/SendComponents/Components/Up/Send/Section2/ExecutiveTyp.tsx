import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useDict from '../../../../../../../hooks/useDict';
import getData from '../../../../../../../utils/getData';
export default function ExecutiveTyp() {
  const { t } = useTranslation();
  const dict = useDict(124);
  const data = getData('executive_typ', 'string');
  return (
    <>
      <Grid sx={{ width: 450 }} item>
        <FormControl error={data.isInvalid} fullWidth>
          <InputLabel id="executive_typ">
            {t('form.send.executive_typ')}
          </InputLabel>
          <Select
            required
            value={data.value}
            onChange={(event) => {
              data.setValue(event.target.value);
            }}
            label={t('form.send.executive_typ')}
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
