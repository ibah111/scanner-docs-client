import { forkJoin, lastValueFrom, of, Observable } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { baseRequest } from '../utils/baseRequest';
import { AxiosRequestConfig } from 'axios';

const url = of('/documents');
const options: Observable<AxiosRequestConfig> = of({ responseType: 'blob' });
export default async function getDocuments(id: number) {
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        id,
      }),
      options,
    ]).pipe(post<Blob>(), transformAxios(), transformError(), authRetry()),
  );
}
