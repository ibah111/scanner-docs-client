import { DebtCalc } from '@contact/models';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { sendApiRequestInstance } from '../utils/sendUtils/requests';
const url = of('/debt_calc');
export default function getDebtCalc(id: number) {
  return forkJoin([sendApiRequestInstance, url, of({ id })]).pipe(
    post<DebtCalc[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
