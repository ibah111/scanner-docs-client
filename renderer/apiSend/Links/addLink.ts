import { forkJoin, of } from 'rxjs';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { axiosConfig } from '../token';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

export default function addLink(data: { linkName: string; linkUrl: string }) {
  const url = of('/Links/addLink');
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of(data),
    axiosConfig(),
  ]).pipe(post<boolean>(), transformAxios(), transformError(), authRetry());
}
