import { forkJoin, of } from 'rxjs';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import LinkType from './LinkType';
import { axiosConfig } from '../token';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

export default function getLinks() {
  const url = of('/Links/getLinks');
  return forkJoin([sendApiRequestInstanceObservable, url, axiosConfig()]).pipe(
    post<LinkType[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
