import { Address } from '@contact/models';
import { CreationAttributes } from '@sql-tools/sequelize';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../utils/processError';
import { validateData } from '@tools/rxjs-pipes/validator';
import { sendApiRequestInstance } from '../utils/sendUtils/requests';
import { AddressInstance } from '../Models/AdressIntance';
const url = of('/create_or_update_debt_guarantor/address');
export default function updateDebtGuarantorAddress(
  body: CreationAttributes<Address>,
) {
  return forkJoin([
    sendApiRequestInstance,
    url,
    of(body).pipe(
      validateData(AddressInstance, {
        transform: { excludeExtraneousValues: true },
        resultTransform: true,
      }),
    ),
  ]).pipe(
    post<Address | { update: true }>(),
    transformAxios(),
    transformError('address'),
    authRetry(),
  );
}
