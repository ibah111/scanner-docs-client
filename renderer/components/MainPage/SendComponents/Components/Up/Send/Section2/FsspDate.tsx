import { DatePicker } from '@mui/x-date-pickers-pro';
import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';
import { useAppDispatch, useAppSelector } from '../../../../../../../Reducer';
import { setSendDocProperty } from '../../../../../../../Reducer/SendDoc';
import moment from 'moment';
/**
 *
 * @returns Дата подачи в ФССП
 */
export default function FsspDate() {
  const { t } = useTranslation();
  const data = getData('fssp_date', 'date');
  const dispatch = useAppDispatch();

  const controller = useAppSelector(
    (state) => state.ValidController.fssp_date_required_controller,
  );

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
              required: data.value ? false : controller,
              error: data.value ? false : controller,
            },
          }}
        />
      </Grid>
    </>
  );
}
