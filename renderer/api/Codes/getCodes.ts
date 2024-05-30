import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import {
  authRetry,
  createFormat,
  get,
  transformAxios,
} from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

const url = of('/codes/%1$s');
const format = createFormat<[string]>();
export default function getCodes(id: number) {
  return lastValueFrom(
    forkJoin([baseRequest, url.pipe(format(String(id)))]).pipe(
      get<string>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
