import { defer, forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { sendApiRequestInstance } from '../utils/sendUtils/requests';
import store from '../ReducerSend';
const data = defer(() => of(store.getState().Search));
const url = of('/search_debt');
export default function getDebt() {
  return forkJoin([sendApiRequestInstance, url, data]).pipe(
    post<[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
