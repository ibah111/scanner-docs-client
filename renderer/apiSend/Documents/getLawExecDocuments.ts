import { DocAttach } from '@contact/models';
import { forkJoin, map, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { AxiosRequestConfig } from 'axios';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/requests';
import { storeToken } from '../token';
type types = 'doc' | 'law_exec';
type results<T extends types> = T extends 'doc' ? Blob : DocAttach[];
const url = of('/documents/getLawExec');
export default function getLawExecDocuments<T extends types>(
  id: number,
  type: T,
) {
  const token = storeToken();
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of([id, type]).pipe(
      map(([id, type]) => {
        if (type === 'doc') return { id };
        return { law_exec_id: id };
      }),
    ),
    of(type).pipe(
      map((type) => {
        if (type === 'doc')
          return {
            iresponseType: 'blob',
            headers: {
              token: token,
            },
          } as AxiosRequestConfig;
        return {
          headers: {
            token,
          },
        };
      }),
    ),
  ]).pipe(post<results<T>>(), transformAxios(), transformError(), authRetry());
}
