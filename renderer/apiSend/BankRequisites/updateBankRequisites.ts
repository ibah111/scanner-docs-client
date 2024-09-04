import { authRetry, put, transformAxios } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { transformError } from '../../utils/processError';
import { BankRequisitesInstance } from '../../Reducer/Requisites';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';

export default function updateBankRequisites(
  id: number,
  body: BankRequisitesInstance,
) {
  const url = of(`/BankRequisites/updateBankRequisites/${id}`);
  return forkJoin([sendApiRequestInstanceObservable, url, of(body)]).pipe(
    put(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
