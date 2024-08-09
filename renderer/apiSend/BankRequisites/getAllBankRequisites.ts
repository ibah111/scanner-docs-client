import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable as requests } from '../../utils/sendUtils/send_server';
import { BankRequisitesClass } from './BankRequisitesInput';

export default function getAllBankRequisites() {
  const url = of('/BankRequisites/getAllBankRequisites');
  return forkJoin([requests, url]).pipe(
    get<BankRequisitesClass[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
