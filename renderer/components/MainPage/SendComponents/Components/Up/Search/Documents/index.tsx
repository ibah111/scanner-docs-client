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
import LawExecDocumentsTable from './LawExecDocumentsTable';
import LawActDocumentsTable from './LawActDocumentsTable';
interface DocumentsProps {
  law_exec_id: number;
  law_act_id: number;
}
export default function Documents({ law_exec_id, law_act_id }: DocumentsProps) {
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
        <Button disabled={Boolean(!law_exec_id)} onClick={handleOpen}>
          {t('form.search.documents')}
        </Button>
      </Grid>
      <Dialog open={open} fullWidth maxWidth={'xl'} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {t('form.documents.title')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid xs={6} item>
              <LawExecDocumentsTable id={law_exec_id} />
            </Grid>
            <Grid xs={6} item>
              <LawActDocumentsTable law_act_id={law_act_id} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('form.documents.close')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
