import { defer, forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/requests';
import { store } from '../../Reducer';
const data = defer(() => of(store.getState().Search));
const url = of('/search_debt');
export default function getDebt() {
  return forkJoin([sendApiRequestInstanceObservable, url, data]).pipe(
    post<[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
