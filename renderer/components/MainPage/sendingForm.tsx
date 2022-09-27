import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import React from 'react';
import SendData from '../../api/SendData';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import { setSend } from '../../Reducer/Send';
import errorDate from '../../utils/errorDate';
import { resetData } from '../../Reducer/Data';

export default function SendingForm() {
  const data = useAppSelector((state) => state.Send);
  const errorDateText = errorDate(data.DateSend);
  const dispatch = useAppDispatch();
  return (
    <>
      <React.Fragment>
        <Paper>
          <Box
            sx={{
              bgcolor: '#cfe8fc',
              height: '280px',
              width: '470px',
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
          >
            <Typography variant="h4" textAlign={'center'}>
              Отправляем в банк/ОСП
            </Typography>
            <DatePicker
              label="Дата отправки"
              value={data.DateSend}
              onChange={(newValue: Moment) => {
                dispatch(
                  setSend([
                    'DateSend',
                    newValue
                      ? newValue.isValid()
                        ? newValue.toISOString()
                        : newValue.toString()
                      : '',
                  ]),
                );
              }}
              renderInput={(params) => (
                <TextField
                  id="date_send"
                  label="Дата"
                  {...params}
                  helperText={errorDateText}
                  variant="filled"
                />
              )}
            />
            <TextField
              error={!data.WhereSend}
              id="where_send"
              label="Куда"
              value={data.WhereSend}
              onChange={(event) => {
                dispatch(setSend(['WhereSend', event.target.value]));
              }}
              helperText={!data.WhereSend ? 'Заполните поле' : ' '}
              variant="outlined"
            />
            <Button
              onClick={() => {
                SendData().then(() => dispatch(resetData()));
              }}
              color="primary"
              variant="contained"
              sx={{ float: 'right', mr: '13px' }}
            >
              Отправить
            </Button>
          </Box>
        </Paper>
      </React.Fragment>
    </>
  );
}
