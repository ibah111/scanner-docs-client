import { forkJoin, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

export class BoxType {
  id: number;
  title: string;
  who_added_type: string;
}

const url = of('Box/getAllBoxTypes');
export default function getAllBoxTypes() {
  return forkJoin([baseRequest, url]).pipe(
    get<BoxType[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
