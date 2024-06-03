import { Grid } from '@mui/material';
import React from 'react';
import getLawExec from '../../../../../../apiSend/Exec/getLawExec';
import Contract from './Contract';
import Name from './Name';
import Find from './Find';
import search from '../../../../../../apiSend/Search/search';
import { useAppDispatch, useAppSelector } from '../../../../../../Reducer';
import { setLawExec } from '../../../../../../Reducer/LawExec';
import {
  setLoadingResults,
  setResults,
  setReloadResults,
} from '../../../../../../Reducer/Results';
import { reset, setSend } from '../../../../../../Reducer/Send';
import CreateExec from './CreateExec';
import Submit from './Submit';
import Comments from './Comments';
import DebtCalc from './DebtCalc';
import Documents from './Documents';
import Reset from './Reset';
import Barcode from './Barcode';

export default function Search() {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.Send.id);
  const la_id = useAppSelector((state) => state.LawExec?.r_act_id);
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
  const docArray = useAppSelector((state) => state.DocArray);
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
        <Barcode />
        <Name onEnter={Click} />
        <Contract onEnter={Click} />
        <Find onClick={Click} loading={loading} />
        <CreateExec />
        <Submit docArray={docArray} />
        <Comments />
        <DebtCalc id={Number(id)} />
        <Documents law_exec_id={Number(id)} law_act_id={la_id} />
        <Reset />
      </Grid>
    </>
  );
}
