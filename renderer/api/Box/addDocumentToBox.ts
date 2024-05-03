import { forkJoin, of } from 'rxjs';
import { baseRequest } from '../../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

interface AddDocumentToBox {
  list: number[];
  box_type_id: number;
}

const url = of('Box/addDocumentToBox');

export default function addDocumentToBox(data: AddDocumentToBox) {
  return forkJoin([baseRequest, url, of(data)]).pipe(
    post(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
