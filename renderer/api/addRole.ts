import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';

const url = of('/role/addRole');
export default async function addRole(user_id: number, role_id: number) {
  return lastValueFrom(
    forkJoin([baseRequest, url, of({ user_id, role_id })]).pipe(
      post(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
