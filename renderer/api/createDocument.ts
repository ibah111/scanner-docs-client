import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { Doc } from '../Schemas/Doc.model';

const url = of('/create');
export default function createDocument(body: Doc) {
  return lastValueFrom(
    forkJoin([baseRequest, url, of({ body })]).pipe(
      post<Doc>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
