import axios, { AxiosError } from 'axios';
import { store } from '../Reducer';
import { callError, callSuccess } from '../Reducer/Message';
import { DocData } from '../Schemas/DocData.model';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export default async function createCode() {
  const data = store.getState().Box;
  try {
    const result = await axios.post<DocData>(server() + '/createBox', {
      ...getToken(),
      ...data,
    });
    store.dispatch(callSuccess('Штрих-код успешно создан'));
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      store.dispatch(callError(e.response.data.message));
    }
    throw e;
  }
}
