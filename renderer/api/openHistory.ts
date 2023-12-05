import { Log } from '../Schemas/Log.model';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import {
  authRetry,
  get,
  transformAxios,
  createFormat,
} from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
/**
 * @todo
 */
const url = of('/openHistory/%1$d');
const format = createFormat<[number]>();
export default async function openHistory(code: number) {
  return lastValueFrom(
    forkJoin([baseRequest, url.pipe(format(code))]).pipe(
      get<Log[]>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
