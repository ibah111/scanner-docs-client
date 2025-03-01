import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { axiosConfig } from '../token';
export interface CommentType {
  dsc: string;
  LawAct: { dsc: string };
}
const url = of('/get_comment');
export default function getComment(data: {
  type: 'law_act' | 'law_exec';
  id: number;
}) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of(data),
    axiosConfig(),
  ]).pipe(post<CommentType>(), transformAxios(), transformError(), authRetry());
}
