import axios, { AxiosError } from 'axios';
import { store } from '../Reducer';
import { callError } from '../Reducer/Message';
import { DocData } from '../Schemas/DocData.model';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export default async function getData(code: string): Promise<DocData> {
  try {
    const result = await axios.post<DocData>(server() + '/data', {
      ...getToken(),
      code,
    });
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      store.dispatch(callError(e.response.data.message));
    }
    throw e;
  }
}
