import { DebtGuarantor } from '@contact/models';
import { CreationAttributes } from '@sql-tools/sequelize';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { validateData } from '@tools/rxjs-pipes/validator';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';
import { DebtGuarantorInstance } from '../../Models/DebtGuarantorInstance';
import { axiosConfig } from '../token';
const url = of('/create_or_update_debt_guarantor');
export default function updateDebtGuarantor(
  body: CreationAttributes<DebtGuarantor>,
) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of(body).pipe(
      validateData(DebtGuarantorInstance, { resultTransform: true }),
    ),
    axiosConfig(),
  ]).pipe(
    post<DebtGuarantor | { update: true }>(),
    transformAxios(),
    transformError('debt_guarantor'),
    authRetry(),
  );
}
