import { LawCourt } from '@contact/models';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { sendApiRequestInstance } from '../utils/sendUtils/requests';
const url = of('/court');
export default function getCourt(
  data: { name: string } | { id: number | string | null },
) {
  return forkJoin([sendApiRequestInstance, url, of(data)]).pipe(
    post<LawCourt[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
