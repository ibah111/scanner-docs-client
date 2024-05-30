import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResetSendData from '../../../../../../utils/ResetSendData';
import { useAppDispatch } from '../../../../../../Reducer';
import { resetBarcodeState } from '../../../../../../Reducer/Barcode';
import { resetSearch } from '../../../../../../Reducer/Search';

export default function Reset() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <>
      <Grid item>
        <Button
          onClick={() => {
            ResetSendData();
            dispatch(resetBarcodeState());
            dispatch(resetSearch());
          }}
        >
          {t('form.search.reset')}
        </Button>
      </Grid>
    </>
  );
}
