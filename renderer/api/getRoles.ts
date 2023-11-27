import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { baseRequest } from '../utils/baseRequest';
import { store } from '../Reducer';
export interface Role {
  id: number;
  name: string;
  title: string;
}
export interface User {
  id: number;
  id_bitrix: number;
  login: string;
  Roles: Role[];
}

interface Page {
  count: number;
  rows: User[];
}
const url = of('/role/get');
export default async function getRoles() {
  const data = store.getState().UserList;
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...data,
      }),
    ]).pipe(post<Page>(), transformAxios(), transformError(), authRetry()),
  );
}
