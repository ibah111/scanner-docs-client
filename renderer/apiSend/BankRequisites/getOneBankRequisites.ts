import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { transformError } from '../../utils/processError';
import { BankRequisitesInstance } from '../../Reducer/Requisites';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';

export default function getOneBankRequisites(id: number) {
  const url = of(`/BankRequisites/getOneBankRequisites/${id}`);
  return forkJoin([sendApiRequestInstanceObservable, url]).pipe(
    get<BankRequisitesInstance>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
