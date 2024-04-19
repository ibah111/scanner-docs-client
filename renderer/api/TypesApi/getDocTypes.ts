import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { Type } from './ClassType';
import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

const url = of('types/getDocTypes');
export default function getDocTypes() {
  return lastValueFrom(
    forkJoin([baseRequest, url]).pipe(
      get<Type[]>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
