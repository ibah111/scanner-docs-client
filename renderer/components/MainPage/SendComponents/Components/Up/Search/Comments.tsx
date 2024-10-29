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
import { useAppDispatch, useAppSelector } from '../../../../../../Reducer';
import { setCommentProperty } from '../../../../../../Reducer/Comment';
import UpdateComment from '../../../../../../apiSend/Comment/updateComments';
import { enqueueSnackbar } from 'notistack';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function Comments() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const id = useAppSelector((state) => state.Send.id);
  const LawActComment = useAppSelector((state) => state.Comment.LawActComment);
  const LawExecComment = useAppSelector(
    (state) => state.Comment.LawExecComment,
  );
  const [prevLawActComment, setPrevNewLawActComment] =
    React.useState<string>('');
  const [prevLawExecComment, setPrevNewLawExecComments] =
    React.useState<string>('');
  const cancelChanges = React.useCallback(() => {
    dispatch(setCommentProperty(['LawActComment', prevLawActComment]));
    dispatch(setCommentProperty(['LawExecComment', prevLawExecComment]));
  }, [dispatch, prevLawActComment, prevLawExecComment]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
    cancelChanges();
  }, [cancelChanges]);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const compare =
    prevLawActComment === LawActComment &&
    prevLawExecComment === LawExecComment;
  const refresh = React.useCallback(() => {
    setPrevNewLawActComment(LawActComment);
    setPrevNewLawExecComments(LawExecComment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (open) {
      refresh();
    }
  }, [open, refresh, prevLawActComment, prevLawExecComment]);
  return (
    <>
      <Grid item>
        <Button disabled={Boolean(!id)} onClick={handleOpen}>
          {t('form.search.comments')}
        </Button>
      </Grid>
      <Dialog open={open} fullWidth maxWidth={'xl'} onClose={handleClose}>
        <DialogTitle variant="h4" sx={{ textAlign: 'center' }}>
          {t('form.comments.title')}{' '}
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
              <Typography variant="h6">
                {t('form.comments.law_exec')}
              </Typography>
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
                onClick={handleClose}
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
                    onClick={() =>
                      UpdateComment().subscribe(() => {
                        enqueueSnackbar('Комментарий изменён', {
                          variant: 'success',
                        });
                        handleClose();
                      })
                    }
                  >
                    {'Принять изменения'}
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
