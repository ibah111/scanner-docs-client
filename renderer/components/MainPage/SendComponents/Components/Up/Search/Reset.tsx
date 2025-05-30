import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResetSendData from '../../../../../../utils/ResetSendData';
import { useAppDispatch } from '../../../../../../Reducer';
import { resetBarcodeState } from '../../../../../../Reducer/Barcode';
import { resetSearch } from '../../../../../../Reducer/Search';
import { enqueueSnackbar } from 'notistack';
import { resetDocArray } from '../../../../../../Reducer/DocArray';
import { resetValidController } from '../../../../../../Reducer/ValidController';

export default function Reset() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <>
      <Grid item>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            enqueueSnackbar('Сбрасываю поля', {
              variant: 'info',
            });
            ResetSendData();
            dispatch(resetBarcodeState());
            dispatch(resetSearch());
            dispatch(resetDocArray());
            dispatch(resetValidController());
          }}
        >
          {t('form.search.reset')}
        </Button>
      </Grid>
    </>
  );
}
