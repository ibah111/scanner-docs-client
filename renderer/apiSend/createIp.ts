import { forkJoin, of } from 'rxjs';
import { store } from '../Reducer';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { sendApiRequestInstanceObservable } from '../utils/sendUtils/send_server';
import { axiosConfig } from './token';

export default function createId() {
  const data = of({
    ...store.getState().Send,
  });
  const url = of('/Exec/createIp');
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    data,
    axiosConfig(),
  ]).pipe(post<boolean>(), transformAxios(), transformError(), authRetry());
}
