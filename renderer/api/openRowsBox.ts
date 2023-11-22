import { store } from '../Reducer';
import { RowDocState } from '../Reducer/RowDoc';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { baseRequest } from '../utils/baseRequest';
import { transformError } from '../utils/processError';

export default async function openRowsBox() {
  const data = store.getState().RowsBox;
  const url = of('/openRowsBox');
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...data,
      }),
    ]).pipe(
      post<RowDocState>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
