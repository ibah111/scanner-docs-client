import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { baseRequest } from '../utils/baseRequest';
import { Page, paramsDataGridInterface } from '../utils/DataGridParameters';
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

const url = of('/role/get');
export default async function getRoles(
  params: paramsDataGridInterface,
): Promise<Page<User>> {
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...params,
      }),
    ]).pipe(
      post<Page<User>>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
