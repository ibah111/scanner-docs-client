import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { DocInstance } from '../Reducer/Doc';

const url = of('/create');
export default function createDocument(body: DocInstance) {
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...body,
      }),
    ]).pipe(
      post<DocInstance>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
