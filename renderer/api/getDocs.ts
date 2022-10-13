import axios from 'axios';
import { store } from '../Reducer';
import { DocsState } from '../Reducer/Docs';
import { callError } from '../Reducer/Message';
import { getToken } from '../utils/getToken';
import server from '../utils/server';

export default async function getDocs() {
  const data = store.getState().DocsComponent;
  try {
    const result = await axios.post<DocsState>(server() + '/getDocs', {
      ...getToken(),
      ...data,
    });
    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      store.dispatch(callError(e.response.data.message));
    }
    throw e;
  }
}
