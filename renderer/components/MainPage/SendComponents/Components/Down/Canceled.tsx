import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LawExecPlain } from '../../../../../apiSend/Search/search';
import DebtCalc from '../Up/Search/DebtCalc';
import Documents from '../Up/Search/Documents';
import Debt from './Debt';

export default function Canceled({
  open,
  onClose,
  row,
  next,
}: {
  open: boolean;
  onClose: () => void;
  row: LawExecPlain;
  next: () => void;
}) {
  const { t } = useTranslation();
  const [openDebt, setOpenDebt] = React.useState(false);
  React.useEffect(() => {
    if (!open) {
      setOpenDebt(false);
    }
  }, [open]);
  return (
    <>
      <Dialog open={open} maxWidth="md" fullWidth onClose={onClose}>
        <DialogTitle>{t('form.canceled.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('form.canceled.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DebtCalc id={Number(row.id)} />
          <Documents id={Number(row.id)} />
          <Button onClick={() => setOpenDebt(true)}>
            {t('form.canceled.debt')}
          </Button>
          <Button onClick={next}>{t('form.canceled.skip')}</Button>
          <Button onClick={onClose}>{t('form.canceled.cancel')}</Button>
        </DialogActions>
      </Dialog>
      <Debt
        row={row}
        open={openDebt}
        handleClose={() => setOpenDebt(false)}
        handleNext={next}
      />
    </>
  );
}
