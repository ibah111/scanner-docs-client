import axios, { AxiosError } from 'axios';
import { store } from '../Reducer';
import { DocsState } from '../Reducer/Docs';
import { callError } from '../Reducer/Message';
import { RowDocState } from '../Reducer/RowDoc';
import { getToken } from '../utils/getToken';
import server from '../utils/server';

export default async function openRowsBox() {
  const data = store.getState().RowsBox;
  try {
    const result = await axios.post<RowDocState>(server() + '/openRowsBox', {
      ...getToken(),
      ...data,
    });
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      store.dispatch(callError(e.response.data.message));
    }
    throw e;
  }
}
