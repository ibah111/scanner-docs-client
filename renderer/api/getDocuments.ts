import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { baseRequest } from '../utils/baseRequest';

const url = of('/documents');

export default async function getDocuments(id: number) {
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        id,
      }),
    ]).pipe(post<Blob>(), transformAxios(), transformError(), authRetry()),
  );
}
