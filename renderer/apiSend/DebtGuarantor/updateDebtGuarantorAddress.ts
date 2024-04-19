import { Address } from '@contact/models';
import { CreationAttributes } from '@sql-tools/sequelize';
import { forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { validateData } from '@tools/rxjs-pipes/validator';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/requests';
import { AddressInstance } from '../../Models/AdressIntance';
import { axiosConfig } from '../token';
const url = of('/create_or_update_debt_guarantor/address');
export default function updateDebtGuarantorAddress(
  body: CreationAttributes<Address>,
) {
  return forkJoin([
    sendApiRequestInstanceObservable,
    url,
    of(body).pipe(
      validateData(AddressInstance, {
        transform: { excludeExtraneousValues: true },
        resultTransform: true,
      }),
    ),
    axiosConfig(),
  ]).pipe(
    post<Address | { update: true }>(),
    transformAxios(),
    transformError('address'),
    authRetry(),
  );
}
