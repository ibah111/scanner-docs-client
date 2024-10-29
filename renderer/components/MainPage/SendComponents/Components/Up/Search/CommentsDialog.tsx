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
import { t } from 'i18next';
import { setCommentProperty } from '../../../../../../Reducer/Comment';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { DialogProps } from './testInterface';
import { useAppDispatch, useAppSelector } from '../../../../../../Reducer';
import React from 'react';
import { enqueueSnackbar } from 'notistack';

class CommentsDialogProps extends DialogProps {
  id: number;
  LawActComment: string;
  LawExecComment: string;
}

export default function CommentsDialog({
  onClose,
  open,
  id,
}: CommentsDialogProps) {
  const dispatch = useAppDispatch();
  const LawActComment = useAppSelector((store) => store.Comment.LawActComment);
  const LawExecComment = useAppSelector(
    (store) => store.Comment.LawExecComment,
  );
  const [prevLawActComment, setPrevNewLawActComment] =
    React.useState<string>('');
  const [prevLawExecComment, setPrevNewLawExecComments] =
    React.useState<string>('');

  const compare =
    prevLawActComment === LawActComment &&
    prevLawExecComment === LawExecComment;
  const cancelChanges = React.useCallback(() => {
    dispatch(setCommentProperty(['LawActComment', prevLawActComment]));
    dispatch(setCommentProperty(['LawExecComment', prevLawExecComment]));
  }, [dispatch, prevLawActComment, prevLawExecComment]);
  React.useEffect(() => {
    enqueueSnackbar('Getting new previous comments values', {
      variant: 'info',
    });
    setPrevNewLawActComment(LawActComment);
    setPrevNewLawExecComments(LawExecComment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'xl'}>
      <DialogTitle variant="h4" sx={{ textAlign: 'center' }}>
        {`Комментарии испол.пр-ва ${id}`}
        {compare ? (
          <>
            <DoneAllIcon color="success" />
          </>
        ) : (
          <>
            <PriorityHighIcon color="warning" />
            <PriorityHighIcon color="warning" />
            <PriorityHighIcon color="warning" />
          </>
        )}
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
            <TextField
              fullWidth
              multiline
              value={LawActComment}
              onChange={(event) => {
                const text = event.target.value;
                dispatch(setCommentProperty(['LawActComment', text]));
              }}
            />
          </Grid>
          <Grid xs={6} item>
            <Typography variant="h6">{t('form.comments.law_exec')}</Typography>
            <TextField
              fullWidth
              multiline
              value={LawExecComment}
              onChange={(event) => {
                const text = event.target.value;
                dispatch(setCommentProperty(['LawExecComment', text]));
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              onClick={onClose}
              disabled={compare === false ? true : false}
            >
              {t('form.comments.close')}
            </Button>
          </Grid>
          {compare === false && (
            <>
              <Grid item>
                <Button
                  disabled={compare}
                  onClick={cancelChanges}
                  variant="outlined"
                  color="error"
                >
                  {'Reset changes'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disabled={compare}
                  onClick={() => {}}
                >
                  {'Принять изменения'}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
