import { useSnackbar } from 'notistack';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../Reducer';
import { resetMessage } from '../Reducer/Message';

export default function MessageShow() {
  const messages = useAppSelector((state) => state.Message);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    console.log('MessageShow.messages', messages);
    if (messages.length > 0) {
      for (const message of messages)
        enqueueSnackbar(
          message.text || 'Неизвестное сообщение',
          message.params,
        );
      dispatch(resetMessage());
    }
  }, [messages]);
  return <></>;
}
