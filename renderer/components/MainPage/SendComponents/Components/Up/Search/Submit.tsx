import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useSnackbar, VariantType } from 'notistack';
import React from 'react';
import updateExec from '../../../../../../apiSend/Exec/updateExec';
import { useAppDispatch, useAppSelector } from '../../../../../../Reducer';
import { saveAs } from 'file-saver';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { ErrorTypes } from '../../../../../../Reducer/Error';
import ResetSendData from '../../../../../../utils/ResetSendData';
import { callError } from '../../../../../../Reducer/Message';
import SendData from '../../../../../../api/SendData';
import moment from 'moment';
import useError from '../../../../../../utils/getData';
import getCourt from '../../../../../../apiSend/Court/getCourt';

function toArrayBuffer(buf: number[]) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}
const check = (
  Error: ErrorTypes,
  error: (value: string, type: VariantType) => void,
) => {
  let errors = 0;
  for (const value of Object.entries(Error)) {
    if (value[1] !== null) {
      errors += 1;
      error(t(`form.errors_popup.${value[1]}`, { value: value[0] }), 'error');
    }
  }
  if (errors === 0) {
    return true;
  } else {
    return false;
  }
};
export default function Submit() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const Send = useAppSelector((state) => state.Send);
  const Error = useAppSelector((state) => state.Error);
  const dispatch = useAppDispatch();
  const AddAlert = React.useCallback(
    (value: string, variant: VariantType = 'success') => {
      enqueueSnackbar(value, { variant, autoHideDuration: 3000 });
    },
    [enqueueSnackbar],
  );
  const date_send = useError('fssp_date', 'date');
  const where_send = useError('r_court_id', 'null');
  const [ws, setWs] = React.useState<string>('');
  console.log('SendData === ', date_send.value, where_send.value);
  const Click = React.useCallback(() => {
    if (check(Error, AddAlert)) {
      setLoading(true);
      getCourt({ id: where_send.value as number }).subscribe((court) => {
        const o = court[0];
        const whereSendString = `(${o.id}), ${o.name}, ${o.address}, ${o.district}`;
        setWs(whereSendString);
      });
      SendData({
        DateSend: moment(date_send.value),
        WhereSend: ws,
      });
      updateExec().subscribe({
        next: (res) => {
          if (res) {
            const file = new Blob([toArrayBuffer(res.file.data)], {
              type: 'application/pdf',
            });
            saveAs(file, res.name);
            ResetSendData();
            setLoading(false);
          } else {
            setLoading(false);
            if (res === null) {
              dispatch(callError('Дело не имеет изменений'));
            }
            if (res === false) {
              dispatch(callError('Вас нет в Контакте, обратитесь в IT отдел'));
            }
          }
        },
        error: () => setLoading(false),
      });
    }
  }, [AddAlert, Error, dispatch]);
  return (
    <>
      <Grid item>
        <LoadingButton
          disabled={Boolean(!Send.id)}
          loading={loading}
          onClick={Click}
        >
          {t('form.search.submit')}
        </LoadingButton>
      </Grid>
    </>
  );
}
