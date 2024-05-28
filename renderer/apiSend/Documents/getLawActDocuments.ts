import { DocAttach } from '@contact/models';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
const url = of('/documents/getLawAct');
export default function getLawActDocuments(law_act_id: number) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of({
      law_act_id,
    }),
  ]).pipe(post<DocAttach[]>(), transformAxios(), transformError(), authRetry());
}
