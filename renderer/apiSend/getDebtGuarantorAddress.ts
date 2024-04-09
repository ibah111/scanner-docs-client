import { Address } from '@contact/models';

import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { sendApiRequestInstanceObservable } from '../utils/sendUtils/requests';
const url = of('/get_debt_guarantor/address');
export default function getDebtGuarantorAddress(value: number) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of({ id: value }),
  ]).pipe(post<Address[]>(), transformAxios(), transformError(), authRetry());
}
