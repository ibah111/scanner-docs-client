import { LawCourt } from '@contact/models';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import {
  sendApiRequestInstanceObservable,
  sendApiRequestInstancePromise,
} from '../../utils/sendUtils/requests';
import { axiosConfig } from '../token';
const urlObservable = of('/court');
export default function getCourt(
  data: { name: string } | { id: number | string | null },
) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    urlObservable,
    of(data),
    axiosConfig(),
  ]).pipe(post<LawCourt[]>(), transformAxios(), transformError(), authRetry());
}

const urlPromise = '/court';
export async function getCourtPromise(
  data: { name: string } | { id: number | string | null },
) {
  const requestPromise = await sendApiRequestInstancePromise.post<LawCourt[]>(
    urlPromise,
    {
      data,
    },
  );
  return requestPromise.data;
}
