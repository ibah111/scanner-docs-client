import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { transformError } from '../../utils/processError';
import { BankRequisitesClass } from './BankRequisitesInput';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';

export default function addBankRequisites(body: Partial<BankRequisitesClass>) {
  const url = of('/BankRequisites/addBankRequisites');
  return forkJoin([sendApiRequestInstanceObservable, url, of(body)]).pipe(
    post(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
