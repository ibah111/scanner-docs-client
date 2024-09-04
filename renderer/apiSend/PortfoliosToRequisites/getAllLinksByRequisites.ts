import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { forkJoin, of } from 'rxjs';
import { transformError } from '../../utils/processError';
import { Portfolio } from '@contact/models';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';

export default function getAllLinksByRequisites(id: number) {
  const url = of(`PortfoliosToRequisites/getAllLinksByRequisites/${id}`);
  return forkJoin([sendApiRequestInstanceObservable, url]).pipe(
    get<Portfolio[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
