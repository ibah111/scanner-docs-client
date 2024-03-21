import { Grid } from '@mui/material';
import React from 'react';
import getLawExec from '../../../../../../apiSend/getLawExec';
import { useAppDispatch, useAppSelector } from '../../../../../../ReducerSend';
import { reset, setSend } from '../../../../../../ReducerSend/Send';
import Contract from './Contract';
import CreateExec from './CreateExec';
import Name from './Name';
import Find from './Find';
import Submit from './Submit';
import search from '../../../../../../apiSend/search';
import {
  setReloadResults,
  setLoadingResults,
  setResults,
} from '../../../../../../ReducerSend/Results';
import Comments from './Comments';
import DebtCalc from './DebtCalc';
import Documents from './Documents';
import Reset from './Reset';
import { setLawExec } from '../../../../../../ReducerSend/LawExec';

export default function Search() {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.Send.id);
  const loading = useAppSelector((state) => state.Results.loading);
  const reload = useAppSelector((state) => state.Results.reload);
  const Click = React.useCallback(() => {
    dispatch(setLoadingResults(true));
    const sub = search().subscribe({
      next: (res) => {
        dispatch(setResults(res));
        dispatch(setLoadingResults(false));
      },
      error: () => {
        setLoadingResults(false);
      },
    });
    return sub.unsubscribe.bind(sub);
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(reset());
    if (id) {
      const sub = getLawExec(id).subscribe((res) => {
        if (res !== null) {
          dispatch(setLawExec(res));
          dispatch(setSend(res));
        }
      });
      return sub.unsubscribe.bind(sub);
    }
  }, [dispatch, id]);
  React.useEffect(() => {
    if (reload) {
      dispatch(setReloadResults(false));
      return Click();
    }
  }, [Click, dispatch, reload]);
  return (
    <>
      <Grid
        item
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Name onEnter={Click} />
        <Contract onEnter={Click} />
        <Find onClick={Click} loading={loading} />
        <CreateExec />
        <Submit />
        <Comments />
        <DebtCalc id={Number(id)} />
        <Documents id={Number(id)} />
        <Reset />
      </Grid>
    </>
  );
}
