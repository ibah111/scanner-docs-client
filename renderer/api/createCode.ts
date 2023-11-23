import { store } from '../Reducer';
import { DocData } from '../Schemas/DocData.model';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import isPrintOnline from '../lib/isPrintOnline';
const url = of('/createBox');

export default async function createCode() {
  const data = store.getState().Box;
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...data,
      }),
    ]).pipe(
      isPrintOnline(),
      post<DocData>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
