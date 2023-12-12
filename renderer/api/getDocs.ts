import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { baseRequest } from '../utils/baseRequest';
import { transformError } from '../utils/processError';
import { Doc } from '../Schemas/Doc.model';
import { Page, paramsDataGridInterface } from '../utils/DataGridParameters';

const url = of('/getDocs');
export default async function getDocs(
  params: paramsDataGridInterface,
): Promise<Page<Doc>> {
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...params,
      }),
    ]).pipe(post<Page<Doc>>(), transformAxios(), transformError(), authRetry()),
  );
}
