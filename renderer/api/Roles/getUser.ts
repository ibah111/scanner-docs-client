import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import {
  authRetry,
  createFormat,
  get,
  transformAxios,
} from '@tools/rxjs-pipes';
import { Role, User } from './getRoles';
import { transformError } from '../../utils/processError';

class AdminRole {
  user: User;
  notInRoles: Role[];
}

const url = of('role/getUser/%1$s');
const format = createFormat<[string]>();
export default function getUser(id: number) {
  return lastValueFrom(
    forkJoin([baseRequest, url.pipe(format(String(id)))]).pipe(
      get<AdminRole>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
