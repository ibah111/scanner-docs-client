import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable as requests } from '../../utils/sendUtils/send_server';

export default function getOneBankRequisites(id: number) {
  const url = of(`/BankRequisites/getOneBankRequisites/${id}`);
  return forkJoin([requests, url]).pipe(
    get(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
