import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/requests';
export class CreateExecOld {
  court_doc_num: string;
  executive_typ: number;
  court_date: Date;
  entry_force_dt: Date;
}
const url = of('/create_exec');
export default function createExec(value: number, old?: CreateExecOld) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of({ id: value, old }),
  ]).pipe(
    post<number | false>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
