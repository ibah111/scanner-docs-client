import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import { baseRequest } from '../utils/baseRequest';
import {
  GridPaginationModel,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid';
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

interface getRoleParams {
  paginationModel: GridPaginationModel;
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
}
const url = of('/role/get');
export default async function getRoles(params: getRoleParams): Promise<Page> {
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...params,
      }),
    ]).pipe(post<Page>(), transformAxios(), transformError(), authRetry()),
  );
}
