import { DebtGuarantor } from '@contact/models';
import { forkJoin, map, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { transformInstance } from '@tools/rxjs-pipes/transformer';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/requests';
import { DebtGuarantorInstance } from '../../Models/DebtGuarantorInstance';
import { axiosConfig } from '../token';
const url = of('/get_debt_guarantor');
export default function getDebtGuarantor(value: number) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of({ id: value }),
    axiosConfig(),
  ]).pipe(
    post<DebtGuarantor>(),
    transformAxios(),
    transformError(),
    authRetry(),
    transformInstance(DebtGuarantorInstance),
    map((instance) => {
      const { ...result } = instance;
      return result as unknown as DebtGuarantor;
    }),
  );
}
