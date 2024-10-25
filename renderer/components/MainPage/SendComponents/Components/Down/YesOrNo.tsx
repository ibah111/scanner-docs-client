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
import createExec from '../../../../../apiSend/Exec/createExec';
import deleteExec from '../../../../../apiSend/Exec/deleteExec';
import getComment from '../../../../../apiSend/Comment/getComment';
import { LawExecPlain } from '../../../../../apiSend/Search/search';
import { useAppDispatch } from '../../../../../Reducer';
import DebtCalc from '../Up/Search/DebtCalc';
import Documents from '../Up/Search/Documents';
import ButtonComment from './ButtonComment';
import { map, mergeMap, tap } from 'rxjs';
import {
  setCommentProperty,
  ResetComment,
} from '../../../../../Reducer/Comment';
import { setId } from '../../../../../Reducer/Send';
import { setSendDocProperty } from '../../../../../Reducer/SendDoc';
import moment from 'moment';

export default function YesOrNo({
  open,
  onClose,
  row,
}: {
  open: boolean;
  onClose: () => void;
  row: LawExecPlain;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const new_row = Boolean(row.fssp_doc_num);
  const Create = React.useCallback(() => {
    createExec(row['LawAct.id'], {
      court_doc_num: row.court_doc_num,
      executive_typ: row.executive_typ,
      court_date: row.court_date,
      entry_force_dt: row.entry_force_dt,
    })
      .pipe(
        mergeMap((value) =>
          getComment({ type: 'law_exec', id: row.id }).pipe(
            tap((res) => {
              dispatch(setCommentProperty(['LawActComment', res.LawAct.dsc]));
              dispatch(setCommentProperty(['LawExecComment', res.dsc]));
            }),
            map(() => value),
          ),
        ),
      )
      .subscribe((res) => {
        if (res) {
          dispatch(ResetComment());
          dispatch(setId(res));
          onClose();
        }
      });
  }, [dispatch, onClose, row]);
  const CreateWithDelete = React.useCallback(() => {
    createExec(row['LawAct.id'], {
      court_doc_num: row.court_doc_num,
      executive_typ: row.executive_typ,
      court_date: row.court_date,
      entry_force_dt: row.entry_force_dt,
    })
      .pipe(
        mergeMap((value) =>
          getComment({ type: 'law_exec', id: row.id }).pipe(
            tap((res) => {
              dispatch(setCommentProperty(['LawActComment', res.LawAct.dsc]));
              dispatch(setCommentProperty(['LawExecComment', res.dsc]));
            }),
            map(() => value),
          ),
        ),
      )
      .subscribe((res) => {
        if (res) {
          dispatch(ResetComment());
          deleteExec(row.id);
          dispatch(setId(res));
          onClose();
        }
      });
  }, [dispatch, onClose, row]);
  const Update = React.useCallback(() => {
    dispatch(ResetComment());
    getComment({ type: 'law_exec', id: row.id }).subscribe((res) => {
      dispatch(setCommentProperty(['LawActComment', res.LawAct.dsc]));
      dispatch(setCommentProperty(['LawExecComment', res.dsc]));
      onClose();
    });
    dispatch(setSendDocProperty(['DateSend', moment()]));
    dispatch(setId(row.id));
    onClose();
  }, [dispatch, onClose, row]);
  return (
    <>
      <Dialog open={open} maxWidth="md" onClose={onClose}>
        <DialogTitle>{t('form.yes_or_no.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(
              new_row
                ? 'form.yes_or_no.description_old'
                : 'form.yes_or_no.description',
              { value: row.fssp_doc_num },
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DebtCalc id={Number(row.id)} />
          <Documents
            law_exec_id={Number(row.id)}
            law_act_id={Number(row['LawAct.id'])}
          />
          {new_row && (
            <Button onClick={Create}>{t('form.yes_or_no.create')}</Button>
          )}
          {new_row && (
            <Button onClick={CreateWithDelete} autoFocus>
              {t('form.yes_or_no.create_with_delete')}
            </Button>
          )}
          <Button onClick={onClose}>{t('form.yes_or_no.cancel')}</Button>
          <Button onClick={Update}>
            {t(new_row ? 'form.yes_or_no.update_old' : 'form.yes_or_no.update')}
          </Button>
          <ButtonComment id={row.id} onClick={onClose} />
        </DialogActions>
      </Dialog>
    </>
  );
}
