import { Button, Grid } from '@mui/material';
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
import DebtCalc from './DebtCalc';
import Documents from './Documents';
import Reset from './Reset';
import Barcode from './Barcode';
import Links from './Links';
import CommentsDialog from './CommentsDialog';
import AdditionalMenu from './Menu/Menu';
import { socketConnect } from '../../../../../../lib/socket';
import { enqueueSnackbar } from 'notistack';

export enum SearchNameListEvents {
  COMMENTS = 'COMMENTS',
}
export class SearchEventsDialog<
  Value = number | string | object,
> extends Event {
  constructor(type: SearchNameListEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}

interface ControlProps {
  DialogTarget: EventTarget;
}

function useSearchControl({ DialogTarget }: ControlProps) {
  const [open, setOpen] = React.useState(false);
  const [LawExecId, setLawExecId] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: SearchEventsDialog) => {
      setLawExecId(e.value as number);
      setOpen(true);
    }) as EventListener;
    DialogTarget.addEventListener(SearchNameListEvents.COMMENTS, callback);
    return () =>
      DialogTarget.removeEventListener(SearchNameListEvents.COMMENTS, callback);
  }, [DialogTarget]);
  const closeSearchDialog = React.useCallback(() => {
    setLawExecId(0);
    setOpen(false);
  }, []);
  return {
    open,
    LawExecId,
    closeSearchDialog,
  };
}
const socket_events = () => {
  const socket = socketConnect();
  socket.on('server_event', (args) => {
    console.log(args);
    enqueueSnackbar('socket server event');
  });
};
export default function Search() {
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const SearchControl = useSearchControl({
    DialogTarget,
  });
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

  const LawActComment = useAppSelector((state) => state.Comment.LawActComment);
  const LawExecComment = useAppSelector(
    (state) => state.Comment.LawExecComment,
  );

  const handleOpen = () =>
    DialogTarget.dispatchEvent(
      new SearchEventsDialog(SearchNameListEvents.COMMENTS, id),
    );
  React.useEffect(() => {
    socket_events();
  });
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
        <AdditionalMenu disabled={Boolean(id)} />
        <CreateExec />
        <Submit docArray={docArray} />
        {/* <Comments /> */}
        <>
          <Grid item>
            <Button disabled={Boolean(!id)} onClick={handleOpen}>
              {'Комментарии'}
            </Button>
          </Grid>
        </>
        {SearchControl.open && (
          <CommentsDialog
            id={SearchControl.LawExecId}
            open={SearchControl.open}
            onClose={SearchControl.closeSearchDialog}
            LawActComment={LawActComment}
            LawExecComment={LawExecComment}
          />
        )}
        <DebtCalc id={Number(id)} />
        <Documents law_exec_id={Number(id)} law_act_id={la_id} />
        <Reset />
        <Links />
      </Grid>
    </>
  );
}
