import { forkJoin, of } from 'rxjs';
import { store } from '../Reducer';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { sendApiRequestInstanceObservable } from '../utils/sendUtils/send_server';
import { axiosConfig } from './token';

interface saveResponse {
  law_act_response: boolean;
  law_exec_response: boolean;
}

export default function saveId() {
  const data = of({
    ...store.getState().Send,
  });
  const url = of('/Exec/saveId');
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    data,
    axiosConfig(),
  ]).pipe(
    post<saveResponse>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
