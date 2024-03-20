import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { sendApiRequestInstance } from '../utils/sendUtils/requests';
export interface CommentType {
  dsc: string;
  LawAct: { dsc: string };
}
const url = of('/get_comment');
export default function getComment(data: {
  type: 'law_act' | 'law_exec';
  id: number;
}) {
  return forkJoin([sendApiRequestInstance, url, of(data)]).pipe(
    post<CommentType>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
