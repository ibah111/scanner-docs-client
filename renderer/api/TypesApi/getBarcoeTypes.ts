import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';
import { Type } from './ClassType';

export default function getBarcodeTypes() {
  const url = of('types/getBarcodeTypes');
  return lastValueFrom(
    forkJoin([baseRequest, url]).pipe(
      get<Type>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
