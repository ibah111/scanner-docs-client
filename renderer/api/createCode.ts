import { forkJoin, lastValueFrom, map, mergeMap, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import isPrintOnline from '../lib/isPrintOnline';
import printBarcode from '../lib/printBarcode';
const url = of('/createBox');

export default async function createCode(list: number[], boxName: string) {
  return lastValueFrom(
    forkJoin([baseRequest, url, of({ list })]).pipe(
      isPrintOnline(),
      post<string>(),
      transformAxios(),
      transformError(),
      authRetry(),
      mergeMap((data) => printBarcode(data, boxName).pipe(map(() => data))),
    ),
  );
}
