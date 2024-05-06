import { forkJoin, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { authRetry, remove, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

const url = of('Box/deleteBoxType');

export default function DeleteBoxType(id_type: number) {
  return forkJoin([baseRequest, url, of(id_type)]).pipe(
    remove(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
