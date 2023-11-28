import { store } from '../Reducer';
import { DocsState } from '../Reducer/Docs';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { baseRequest } from '../utils/baseRequest';
import { transformError } from '../utils/processError';

const url = of('/getDocs');
export default async function getDocs() {
  const data = store.getState().DocsComponent;
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...data,
      }),
    ]).pipe(post<DocsState>(), transformAxios(), transformError(), authRetry()),
  );
}
