import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LawExecPlain } from '../../../../../../apiSend/Search/search';
import Table from './Table';

export default function Debt({
  row,
  open,
  handleClose,
  handleNext,
}: {
  row: LawExecPlain;
  open: boolean;
  handleClose: () => void;
  handleNext: () => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <Dialog fullWidth maxWidth={false} open={open} onClose={handleClose}>
        <DialogTitle>{t('form.debt.title')}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              m: 'auto',
            }}
          >
            <DialogContentText>{t('form.debt.description')}</DialogContentText>
            <Table row={row} handleClose={handleNext} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
