import { Box, Button, Dialog, Paper, Typography } from '@mui/material';
import React from 'react';
import SendData from '../../api/SendData';
import { useAppDispatch } from '../../Reducer';
import { resetData } from '../../Reducer/Data';
import DateSend from './MainPageForm/DateSend';
import WhereSend from './MainPageForm/WhereSend.';
interface SendingFormInterface {
  open: boolean;
  onClose: VoidFunction;
}
export default function SendingForm({ ...props }: SendingFormInterface) {
  const dispatch = useAppDispatch();
  return (
    <Dialog {...props}>
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
            <DateSend />
            <WhereSend />
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
    </Dialog>
  );
}
