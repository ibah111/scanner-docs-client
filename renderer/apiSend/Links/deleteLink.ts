import { forkJoin, of } from 'rxjs';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import LinkType from './LinkType';
import { axiosConfig } from '../token';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

export default function deleteLink(data: LinkType) {
  const url = of('/Links/deleteLink');
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of(data),
    axiosConfig(),
  ]).pipe(post<boolean>(), transformAxios(), transformError(), authRetry());
}
