import store from '../ReducerSend';
import { ResetComment } from '../ReducerSend/Comment';
import { reset, setId } from '../ReducerSend/Send';

export default function ResetSendData() {
  store.dispatch(setId(0));
  store.dispatch(reset());
  store.dispatch(ResetComment());
}
