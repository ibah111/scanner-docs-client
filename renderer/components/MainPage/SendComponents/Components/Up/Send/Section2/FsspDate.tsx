import { DatePicker } from '@mui/x-date-pickers-pro';
import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';
/**
 * Дата подачи в ФССП
 */
export default function FsspDate() {
  const { t } = useTranslation();
  const data = getData('fssp_date', 'date');

  const r_court_name = getData('r_court_name', 'string', true);
  const is_sberbank: boolean = r_court_name.value === 'Сбербанк' ? true : false;
  return (
    <>
      <Grid item>
        <DatePicker
          label={t('form.send.fssp_date')}
          value={data.value}
          onChange={(newValue) => data.setValue(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              error: data.isInvalid,
              sx:
                is_sberbank === true
                  ? {
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: '2px green solid',
                        },
                        '&:hover fieldset': {
                          borderColor: 'green',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'green',
                        },
                      },
                    }
                  : {},
            },
          }}
        />
      </Grid>
    </>
  );
}
