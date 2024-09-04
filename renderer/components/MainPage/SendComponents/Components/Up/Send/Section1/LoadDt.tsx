import { DatePicker } from '@mui/x-date-pickers-pro';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';

export default function LoadDt() {
  const { t } = useTranslation();
  const data = getData('load_dt', 'date');
  return (
    <>
      <Grid sx={{ width: 300 }} item>
        <DatePicker
          label={t('form.send.load_dt')}
          value={data.value}
          onChange={(newValue) => data.setValue(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              error: data.isInvalid,
            },
          }}
        />
      </Grid>
    </>
  );
}
