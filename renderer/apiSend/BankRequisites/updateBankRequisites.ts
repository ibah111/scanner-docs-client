import { authRetry, put, transformAxios } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable as requests } from '../../utils/sendUtils/send_server';
import { BankRequisitesClass } from './BankRequisitesInput';

export default function updateBankRequisites(
  id: number,
  body: BankRequisitesClass,
) {
  const url = of(`/BankRequisites/updateBankRequisites/${id}`);
  return forkJoin([requests, url, of(body)]).pipe(
    put(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
