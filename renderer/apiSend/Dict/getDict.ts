import { Dict } from '@contact/models';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { axiosConfig } from '../token';
const url = of('/dict');
export default function getDict(value: number) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of({ id: value }),
    axiosConfig(),
  ]).pipe(post<Dict[]>(), transformAxios(), transformError(), authRetry());
}
