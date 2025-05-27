import { post, transformAxios, authRetry } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { store } from '../Reducer';
import { getPrecision } from '../utils/getPrecision';
import { transformError } from '../utils/processError';
import { sendApiRequestInstanceObservable } from '../utils/sendUtils/send_server';
import { axiosConfig } from './token';

const url = of('/create_exec');

export default function createIp() {
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
