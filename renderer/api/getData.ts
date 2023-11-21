import { Doc } from '../Schemas/Doc.model';
import { Observable, forkJoin, of } from 'rxjs';
import { createFormat } from '@tools/rxjs-pipes/format';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, get, transformAxios } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
const url = of('/data/%1$s');
const format = createFormat<[string]>();
export default function getData(code: string): Observable<Doc[]> {
  return forkJoin([baseRequest, url.pipe(format(code))]).pipe(
    get<Doc[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
