import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useSnackbar, VariantType } from 'notistack';
import React from 'react';
import updateExec from '../../../../../../apiSend/Exec/updateExec';
import {
  store,
  useAppDispatch,
  useAppSelector,
} from '../../../../../../Reducer';
import { saveAs } from 'file-saver';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { ErrorTypes } from '../../../../../../Reducer/Error';
import ResetSendData from '../../../../../../utils/ResetSendData';
import { callError } from '../../../../../../Reducer/Message';
import SendData from '../../../../../../api/SendData';
import moment from 'moment';
/**
 * default export useError as getData
 */
import getData from '../../../../../../utils/getData';

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
  const date_send = getData('fssp_date', 'date');
  const where = getData('r_court_id', 'null');

  const state_id = store.getState().DocArray[0]?.id;
  const WhereSend = where.value as string;
  const DateSend = moment(date_send.value);

  //Tracking document callback
  const SendTrackingDocument = React.useCallback(async () => {
    return SendData({
      id: state_id,
      DateSend,
      WhereSend,
    });
  }, []);

  //LawExec callback
  const UpdateLawExec = React.useCallback(
    () =>
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
        complete: () => setLoading(false),
      }),
    [],
  );

  //Click callback function
  const Click = React.useCallback(() => {
    if (check(Error, AddAlert)) {
      setLoading(true);
      //
      if (state_id && DateSend && WhereSend) {
        enqueueSnackbar('Отправляю отслеживаемый документ', {
          variant: 'info',
        });
        SendTrackingDocument().then((res) => {
          if (res) {
            console.log('Sended tracking document, Transmit Results: ', res);
            UpdateLawExec();
          }
        });
      }
      //
      enqueueSnackbar('Отправлено, без отслеживания', {
        variant: 'warning',
      });
      UpdateLawExec();
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
