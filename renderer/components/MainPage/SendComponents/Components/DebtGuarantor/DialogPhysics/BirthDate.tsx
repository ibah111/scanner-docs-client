import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useData from '../useData';
import { DateTime } from 'luxon';
import { DatePicker } from '@mui/x-date-pickers-pro';

export default function BirthDate() {
  const data = useData('birth_date');

  const { t } = useTranslation();
  return (
    <Grid xs={3} item>
      <DatePicker
        label={t('form.debt_guarantor.birth_date')}
        value={data.value || null}
        onChange={(value) => {
          //@ts-expect-error По сути должно преобразовать без проблем
          data.setValue(value as DateTime);
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            required: data.required,
            error: data.error,
            helperText: data.helperText,
          },
        }}
      />
    </Grid>
  );
}
