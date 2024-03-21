import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../../ReducerSend';

export default function Comments() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const id = useAppSelector((state) => state.Send.id);
  const LawActComment = useAppSelector((state) => state.Comment.LawAct);
  const LawExecComment = useAppSelector((state) => state.Comment.LawExec);
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
          {t('form.search.comments')}
        </Button>
      </Grid>
      <Dialog open={open} fullWidth maxWidth={'xl'} onClose={handleClose}>
        <DialogTitle variant="h4" sx={{ textAlign: 'center' }}>
          {t('form.comments.title')}
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <Grid xs={6} item>
              <Typography variant="h6">{t('form.comments.law_act')}</Typography>
              <TextField fullWidth multiline value={LawActComment} />
            </Grid>
            <Grid xs={6} item>
              <Typography variant="h6">
                {t('form.comments.law_exec')}
              </Typography>
              <TextField fullWidth multiline value={LawExecComment} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('form.comments.close')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
