import { forkJoin, of } from 'rxjs';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { store } from '../../Reducer';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';

export default function UpdateComment() {
  const url = of('/update_comment');
  const comments = store.getState().Comment;
  const law_exec_id = store.getState().Send.id;
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of({
      law_exec_id,
      law_exec_comment: comments.LawActComment,
      law_act_comment: comments.LawExecComment,
    }),
  ]).pipe(post(), transformAxios(), transformError(), authRetry());
}
