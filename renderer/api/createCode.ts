import { forkJoin, lastValueFrom, map, mergeMap, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import isPrintOnline from '../lib/isPrintOnline';
import printBarcode from '../lib/printBarcode';
const url = of('/createBox');

export default async function createCode(list: number[], boxTitle: string) {
  return lastValueFrom(
    forkJoin([baseRequest, url, of({ list, boxTitle })]).pipe(
      isPrintOnline(),
      post<string>(),
      transformAxios(),
      transformError(),
      authRetry(),
      mergeMap((data) => printBarcode(data, boxTitle).pipe(map(() => data))),
    ),
  );
}
