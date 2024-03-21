import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import addComment from '../../../../../apiSend/addComment';

export default function ButtonComment({
  id,
  onClick,
}: {
  id: number;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const [comment, setComment] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [checkedLawAct, setCheckedLawAct] = React.useState(true);
  const [checkedLawExec, setCheckedLawExec] = React.useState(true);
  const handleClose = React.useCallback(() => {
    setOpen(false);
    onClick();
  }, [onClick]);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleSubmit = React.useCallback(() => {
    addComment(id, comment, checkedLawAct, checkedLawExec).subscribe(() => {
      handleClose();
    });
  }, [checkedLawAct, checkedLawExec, comment, handleClose, id]);
  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
        }}
      >
        {t('form.yes_or_no.comment')}
      </Button>
      <Dialog open={open} fullWidth onClose={handleClose}>
        <DialogTitle>{t('form.set_comment.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('form.set_comment.instruction')}
          </DialogContentText>
          <FormControlLabel
            label={t('form.set_comment.checkbox_law_act')}
            control={
              <Checkbox
                checked={checkedLawAct}
                onChange={(event) => setCheckedLawAct(event.target.checked)}
              />
            }
          />
          <FormControlLabel
            label={t('form.set_comment.checkbox_law_exec')}
            control={
              <Checkbox
                checked={checkedLawExec}
                onChange={(event) => setCheckedLawExec(event.target.checked)}
              />
            }
          />
          <TextField
            label={t('form.set_comment.text')}
            value={comment}
            fullWidth
            multiline
            margin="dense"
            onChange={(event) => setComment(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('form.set_comment.cancel')}</Button>
          <Button onClick={handleSubmit}>{t('form.set_comment.submit')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
