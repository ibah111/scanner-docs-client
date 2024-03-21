import { DatePicker } from '@mui/x-date-pickers-pro';
import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';

export default function ReceiptRecoverDt() {
  const { t } = useTranslation();
  const data = getData('receipt_recover_dt', 'date', true);
  return (
    <>
      <Grid sx={{ width: 410 }} item>
        <DatePicker
          label={t('form.send.receipt_recover_dt')}
          value={data.value}
          onChange={(newValue) => data.setValue(newValue)}
          slotProps={{ textField: { fullWidth: true, error: data.isInvalid } }}
        />
      </Grid>
    </>
  );
}
