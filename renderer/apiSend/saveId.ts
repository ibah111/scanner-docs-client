import { forkJoin, of } from 'rxjs';
import { store } from '../Reducer';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { sendApiRequestInstanceObservable } from '../utils/sendUtils/send_server';
import { axiosConfig } from './token';
import { getPrecision } from '../utils/getPrecision';

const url = of('/Exec/saveId');

export default function saveId() {
  const data = of({
    ...store.getState().Send,
    court_sum: getPrecision(store.getState().Send.court_sum),
    debt_payments_sum: getPrecision(store.getState().Send.debt_payments_sum),
    total_sum: getPrecision(store.getState().Send.total_sum),
  });

  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    data,
    axiosConfig(),
  ]).pipe(
    post<number | false>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
