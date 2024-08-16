import { defer, forkJoin, of } from 'rxjs';
import { store } from '../../Reducer';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { axiosConfig } from '../token';
type FileUpdate =
  | false
  | {
      file: { data: number[] };
      name: string;
    };
const url = of('/update_exec');
const data = defer(() =>
  of({ ...store.getState().Send, options: { save_file: true } }),
);
export default function updateExec() {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    data,
    axiosConfig(),
  ]).pipe(
    post<FileUpdate | true>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
