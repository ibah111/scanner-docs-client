import { defer, forkJoin, of } from 'rxjs';
import { store } from '../../Reducer';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { axiosConfig } from '../token';
import { getPrecision } from '../../utils/getPrecision';

type FileUpdate =
  | false
  | {
      file: { data: number[] };
      name: string;
    };
const url = of('/update_exec');

export default function updateExec() {
  const data = defer(() => {
    const state = store.getState().Send;
    const totalSum = getPrecision(state.total_sum);

    if (totalSum === null || totalSum <= 0) {
      throw new Error('Общая сумма должна быть больше 0');
    }

    return of({
      ...state,
      court_sum: getPrecision(state.court_sum),
      debt_payments_sum: getPrecision(state.debt_payments_sum),
      total_sum: totalSum,
      options: { save_file: true },
    });
  });

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
