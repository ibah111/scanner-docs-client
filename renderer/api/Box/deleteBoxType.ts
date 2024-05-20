import { forkJoin, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { authRetry, remove, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';
import { IdBoxTypeInput } from './BoxUtils/IdBoxTypeInput';

const url = of('Box/deleteBoxType');

export default function DeleteBoxType(data: IdBoxTypeInput) {
  return forkJoin([baseRequest, url, of(data)]).pipe(
    remove(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
