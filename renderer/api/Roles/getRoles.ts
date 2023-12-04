import { forkJoin, lastValueFrom, of } from 'rxjs';
import { Type } from '../TypesApi/ClassType';
import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { baseRequest } from '../../utils/baseRequest';
import { transformError } from '../../utils/processError';

export default function getRoles() {
  const url = of('role/getRoles');
  return lastValueFrom(
    forkJoin([baseRequest, url]).pipe(
      get<Type>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
