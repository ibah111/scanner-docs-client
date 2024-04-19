import { DatePicker } from '@mui/x-date-pickers-pro';
import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';

export default function CourtDate() {
  const { t } = useTranslation();
  const data = getData('court_date', 'date');
  return (
    <>
      <Grid sx={{ width: 600 }} item>
        <DatePicker
          label={t('form.send.court_date')}
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
