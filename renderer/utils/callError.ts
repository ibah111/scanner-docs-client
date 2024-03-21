import { setError } from '../ReducerSend/Error';
import Reducer from '../ReducerSend';
import { DataNames } from '../ReducerSend/Send';

export default function callError(
  name: DataNames,
  error: string | null = null,
) {
  if (error) {
    Reducer.dispatch(setError([name, error]));
  } else {
    Reducer.dispatch(setError([name, null]));
  }
}
