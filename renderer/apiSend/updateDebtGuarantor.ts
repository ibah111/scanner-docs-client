import { DebtGuarantor } from '@contact/models';
import { CreationAttributes } from '@sql-tools/sequelize';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { validateData } from '@tools/rxjs-pipes/validator';
import { sendApiRequestInstance } from '../utils/sendUtils/requests';
import { DebtGuarantorInstance } from '../Models/DebtGuarantorInstance';
const url = of('/create_or_update_debt_guarantor');
export default function updateDebtGuarantor(
  body: CreationAttributes<DebtGuarantor>,
) {
  return forkJoin([
    sendApiRequestInstance,
    url,
    of(body).pipe(
      validateData(DebtGuarantorInstance, { resultTransform: true }),
    ),
  ]).pipe(
    post<DebtGuarantor | { update: true }>(),
    transformAxios(),
    transformError('debt_guarantor'),
    authRetry(),
  );
}
