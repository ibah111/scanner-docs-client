import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DebtCalcTable from './DebtCalcTable';
interface DebtCalcProps {
  id: number;
}
//Платежи
export default function DebtCalc({ id }: DebtCalcProps) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  return (
    <>
      <Grid item>
        <Button disabled={Boolean(!id)} onClick={handleOpen}>
          {t('form.search.debt_calc')}
        </Button>
      </Grid>
      <Dialog open={open} fullWidth maxWidth={'xl'} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {t('form.debt_calc.title')}
        </DialogTitle>
        <DialogContent>
          <DebtCalcTable id={id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('form.debt_calc.close')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
