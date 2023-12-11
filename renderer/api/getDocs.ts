import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { baseRequest } from '../utils/baseRequest';
import { transformError } from '../utils/processError';
import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { Doc } from '../Schemas/Doc.model';

interface getDocsParams {
  paginationModel: GridPaginationModel;
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
}
interface Page {
  count: number;
  rows: Doc[];
}

const url = of('/getDocs');
export default async function getDocs(params: getDocsParams): Promise<Page> {
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
