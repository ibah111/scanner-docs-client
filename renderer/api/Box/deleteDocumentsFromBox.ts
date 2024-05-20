import { forkJoin, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { authRetry, remove, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

const url = of('Box/deleteDocumentsFromBox');

export default function DeleteDocumentsFromBox(list: number[]) {
  return forkJoin([baseRequest, url, of(list)]).pipe(
    remove(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
