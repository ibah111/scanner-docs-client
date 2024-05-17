import { forkJoin, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

const url = of('Box/addBoxType');

class AddBoxTypeClass {
  title: string;
}

export default function AddBoxType(data: AddBoxTypeClass) {
  return forkJoin([baseRequest, url, of(data)]).pipe(
    post(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
