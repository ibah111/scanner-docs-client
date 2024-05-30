import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { axiosConfig } from '../token';
const url = of('documents/remove');
export default function removeDocument(id: number) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of({ id }),
    axiosConfig(),
  ]).pipe(post<boolean>(), transformAxios(), transformError(), authRetry());
}
