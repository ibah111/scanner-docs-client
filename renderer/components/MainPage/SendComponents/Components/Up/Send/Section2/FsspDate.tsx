import { DatePicker } from '@mui/x-date-pickers-pro';
import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';
import { useAppDispatch, useAppSelector } from '../../../../../../../Reducer';
import { setSendDocProperty } from '../../../../../../../Reducer/SendDoc';
import moment from 'moment';

export default function FsspDate() {
  const { t } = useTranslation();
  const data = getData('fssp_date', 'date');
  const dispatch = useAppDispatch();
  const DateSend = useAppSelector((state) => state.SendDoc.DateSend);
  return (
    <>
      <Grid item>
        <DatePicker
          label={t('form.send.fssp_date')}
          value={data.value}
          onChange={(newValue) => {
            data.setValue(newValue);
            dispatch(setSendDocProperty(['DateSend', moment(newValue)]));
          }}
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
