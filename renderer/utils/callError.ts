import { store } from '../Reducer';
import { setError } from '../Reducer/Error';
import { DataNames } from '../Reducer/Send';

export default function callError(
  name: DataNames,
  error: string | null = null,
) {
  if (error) {
    store.dispatch(setError([name, error]));
  } else {
    store.dispatch(setError([name, null]));
  }
}
