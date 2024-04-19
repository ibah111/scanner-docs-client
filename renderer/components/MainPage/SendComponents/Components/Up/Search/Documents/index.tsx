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
import DocumentsTable from './DocumentsTable';
interface DocumentsProps {
  id: number;
}
export default function Documents({ id }: DocumentsProps) {
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
          {t('form.search.documents')}
        </Button>
      </Grid>
      <Dialog open={open} fullWidth maxWidth={'xl'} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {t('form.documents.title')}
        </DialogTitle>
        <DialogContent>
          <DocumentsTable id={id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('form.documents.close')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
