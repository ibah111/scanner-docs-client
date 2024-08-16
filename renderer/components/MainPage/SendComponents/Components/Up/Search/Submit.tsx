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
/**
 * default export useError as getData
 */
import { Doc } from '../../../../../../Schemas/Doc.model';
import { resetValidController } from '../../../../../../Reducer/ValidController';

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
  console.log('check');
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

class SubmitProps {
  docArray?: Doc[];
}

export default function Submit({ docArray }: SubmitProps) {
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

  //LawExec callback
  const UpdateLawExec = React.useCallback(
    () =>
      updateExec().subscribe({
        next: (res) => {
          if (res === true) {
            alert('Отправлено в СБЕРБАНК. Сопровод не формируется.');
            enqueueSnackbar('Отправлено в СБЕРБАНК. Сопровод не формируется.', {
              variant: 'success',
              autoHideDuration: 5 * 1000,
            });
          } else if (res) {
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
    [dispatch, enqueueSnackbar],
  );
  const WhereSend = useAppSelector((state) => state.SendDoc.WhereSend);
  const DateSend = useAppSelector((state) => state.SendDoc.DateSend);
  const BoxTypeId = useAppSelector((state) => state.SendDoc.BoxTypeId);
  //Click callback function
  const Click = React.useCallback(() => {
    console.log('Error:', Error);
    if (check(Error, AddAlert)) {
      setLoading(true);
      if (docArray.length > 0) {
        const doc_id = docArray[0].id;
        enqueueSnackbar(`Отправляю отслеживаемый документ с id: ${doc_id}`, {
          variant: 'info',
        });
        alert(
          `Документ отправлен с отслеживанием. Данные отслеживаемого документа: \nID: ${doc_id}, \nДата отправки: ${DateSend}, \nКуда отправлено: ${WhereSend} \nПомещено в короб #${BoxTypeId}`,
        );
        SendData({
          id: doc_id,
          DateSend,
          WhereSend,
          BoxTypeId,
        });
        UpdateLawExec();
        dispatch(resetValidController());
      }

      if (docArray.length === 0) {
        enqueueSnackbar('Отправлено, без отслеживания', {
          variant: 'warning',
        });
        UpdateLawExec();
        dispatch(resetValidController());
      }
    }
  }, [
    Error,
    AddAlert,
    docArray,
    enqueueSnackbar,
    DateSend,
    WhereSend,
    BoxTypeId,
    UpdateLawExec,
    dispatch,
  ]);

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
