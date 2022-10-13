import axios from 'axios';
import { store } from '../Reducer';
import { callError } from '../Reducer/Message';
import { Log } from '../Schemas/Log.model';
import { getToken } from '../utils/getToken';
import server from '../utils/server';

export default async function openHistory(code: number) {
  try {
    const result = await axios.post<Log[]>(server() + '/openHistory', {
      ...getToken(),
      code,
    });
    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      store.dispatch(callError(e.response.data.message));
    }
    throw e;
  }
}
