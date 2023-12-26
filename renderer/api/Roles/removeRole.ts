import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';
import { baseRequest } from '../../utils/baseRequest';

const url = of('/role/removeRole');
export default async function removeRole(user_id: number, role_id: number) {
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        user_id,
        role_id,
      }),
    ]).pipe(post(), transformAxios(), transformError(), authRetry()),
  );
}
