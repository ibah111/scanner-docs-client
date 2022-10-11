import axios, { AxiosError } from 'axios';
import { store } from '../Reducer';
import { callError } from '../Reducer/Message';
import { getToken } from '../utils/getToken';
import server from '../utils/server';

export default async function getDocuments(id: number) {
  try {
    const result = await axios.post<Blob>(
      server() + '/documents',
      { ...getToken(), id },
      { responseType: 'blob' },
    );
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const data = JSON.parse(await (e.response.data as Blob).text());
      store.dispatch(callError(data.message));
    }
    throw e;
  }
}
