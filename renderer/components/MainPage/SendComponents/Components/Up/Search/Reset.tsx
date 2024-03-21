import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResetSendData from '../../../../../../utils/ResetSendData';

export default function Reset() {
  const { t } = useTranslation();
  return (
    <>
      <Grid item>
        <Button onClick={ResetSendData}>{t('form.search.reset')}</Button>
      </Grid>
    </>
  );
}
