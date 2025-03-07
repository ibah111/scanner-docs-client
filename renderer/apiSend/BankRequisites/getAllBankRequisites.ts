import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { transformError } from '../../utils/processError';
import { BankRequisitesClass } from './BankRequisitesInput';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';

export default function getAllBankRequisites() {
  const url = of('/BankRequisites/getAllBankRequisites');
  return forkJoin([sendApiRequestInstanceObservable, url]).pipe(
    get<BankRequisitesClass[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
