import { RowDocState } from '../Reducer/RowDoc';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { baseRequest } from '../utils/baseRequest';
import { transformError } from '../utils/processError';
import { paramsDataGridInterface } from '../utils/DataGridParameters';

const url = of('/openRowsBox');
export default async function openRowsBox(params: paramsDataGridInterface) {
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...params,
      }),
    ]).pipe(
      post<RowDocState>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
