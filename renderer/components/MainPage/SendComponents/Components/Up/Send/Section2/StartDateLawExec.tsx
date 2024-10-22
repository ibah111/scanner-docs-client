import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro';
import getData from '../../../../../../../utils/getData';
import { DateTime } from 'luxon';

export default function StartDateLawExec() {
  const data = getData('start_date', 'date', true);
  const r_court_name_data = getData('r_court_name', 'string');
  const value = r_court_name_data.value;
  const is_sberbank = value === 'Сбербанк' ? true : false;
  return (
    <>
      <Grid item>
        <DatePicker
          disabled={is_sberbank}
          label={'Дата возбуждения'}
          onChange={(newValue) => data.setValue(newValue)}
          value={is_sberbank ? DateTime.now() : data.value}
          slotProps={{
            textField: {
              sx: is_sberbank
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
                      '&.Mui-disabled fieldset': {
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
