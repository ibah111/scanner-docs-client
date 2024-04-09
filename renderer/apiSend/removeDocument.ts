import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { sendApiRequestInstanceObservable } from '../utils/sendUtils/requests';
const url = of('documents/remove');
export default function removeDocument(id: number) {
  return forkJoin([sendApiRequestInstanceObservable, url, of({ id })]).pipe(
    post<boolean>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
