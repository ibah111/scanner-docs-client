import { LawExec } from '@contact/models';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/requests';
import { axiosConfig } from '../token';
const url = of('/law_exec');
export default function getLawExec(value: number | null) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of({ id: value }),
    axiosConfig(),
  ]).pipe(post<LawExec>(), transformAxios(), transformError(), authRetry());
}
