import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable as requests } from '../../utils/sendUtils/send_server';
import { BankRequisitesClass } from './BankRequisitesInput';

export default function addBankRequisites(body: Partial<BankRequisitesClass>) {
  const url = of('/BankRequisites/addBankRequisites');
  return forkJoin([requests, url, of(body)]).pipe(
    post(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
