import { defer, forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { store } from '../../Reducer';
import { axiosConfig } from '../token';
const data = defer(() => of(store.getState().Search));
const url = of('/search_debt');
export default function getDebt() {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    data,
    axiosConfig(),
  ]).pipe(post<[]>(), transformAxios(), transformError(), authRetry());
}
