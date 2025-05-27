import { useSnackbar } from 'notistack';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../Reducer';
import { resetMessage } from '../Reducer/Message';

export default function MessageShow() {
  const messages = useAppSelector((state) => state.Message);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (messages.length > 0) {
      for (const message of messages) {
        const messageText = message?.text;
        const messageParams = message?.params;
        if (messageText && messageParams) {
          enqueueSnackbar(messageText, messageParams);
        }
      }
      dispatch(resetMessage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  return <></>;
}
