import { DatePicker } from '@mui/x-date-pickers-pro';
import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';

export default function EntryForceDt() {
  const { t } = useTranslation();
  const data = getData('entry_force_dt', 'date');
  return (
    <>
      <Grid sx={{ width: 410 }} item>
        <DatePicker
          label={t('form.send.entry_force_dt')}
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
