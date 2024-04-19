import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/requests';
import { axiosConfig } from '../token';
const url = of('/delete_exec');
export default function deleteExec(value: number) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of({ id: value }),
    axiosConfig(),
  ]).pipe(
    post<false | number>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
