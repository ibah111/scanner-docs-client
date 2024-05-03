import { forkJoin, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { authRetry, remove, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

const url = of('Box/deleteDocumentsFromBox');

export default function deleteDocumentsFromBox() {
  return forkJoin([baseRequest, url]).pipe(
    remove(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
