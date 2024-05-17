import { forkJoin, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { authRetry, put, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';
import { IdBoxTypeInput } from './BoxUtils/IdBoxTypeInput';

const url = of('Box/restoreBoxType');

export default function DeleteBoxType(data: IdBoxTypeInput) {
  return forkJoin([baseRequest, url, of(data)]).pipe(
    put(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
