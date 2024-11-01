import { defer, forkJoin, of } from 'rxjs';
import { store } from '../../Reducer';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { axiosConfig } from '../token';
type FileUpdate =
  | false
  | {
      file: { data: number[] };
      name: string;
    };
const url = of('/update_exec');

function getPrecision(num: number): number {
  const value = (Math.round(num * 100) / 100).toFixed(2);
  return Number(value);
}

export default function updateExec() {
  const data = defer(() =>
    of({
      ...store.getState().Send,
      court_sum: getPrecision(store.getState().Send.court_sum),
      debt_payments_sum: getPrecision(store.getState().Send.debt_payments_sum),
      total_sum: getPrecision(store.getState().Send.total_sum),
      options: { save_file: true },
    }),
  );
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    data,
    axiosConfig(),
  ]).pipe(
    post<FileUpdate | true>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
