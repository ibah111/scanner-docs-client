import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, remove, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { baseRequest } from '../utils/baseRequest';

export default async function removeRole(id: number) {
  const url = of('/role/removeRole');
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        id,
      }),
    ]).pipe(remove<boolean>(), transformAxios(), transformError(), authRetry()),
  );
}
