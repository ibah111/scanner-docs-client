import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LawActPlain } from '../../../../../../apiSend/getLawAct';
import Table from './Table';

export default function Debt({
  row,
  open,
  handleClose,
  handleNext,
}: {
  row: LawActPlain;
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
