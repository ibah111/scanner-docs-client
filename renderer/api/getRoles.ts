import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { baseRequest } from '../utils/baseRequest';
export interface Role {
  id: number;
  name: string;
  title: string;
  Users_Roles: User_Role[];
}
interface User_Role {
  id: number;
  user_id: number;
  User: User;
  role_id: number;
  Role: Role;
}
export interface User {
  id: number;
  id_bitrix: number;
  login: string;
  Users_Roles: User_Role[];
}
export interface ResultRole {
  roles: Role[];
  users: User[];
}

const url = of('/role/get');
export default async function getRoles() {
  return lastValueFrom(
    forkJoin([baseRequest, url]).pipe(
      get<ResultRole>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
