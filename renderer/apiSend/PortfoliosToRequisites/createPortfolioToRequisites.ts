import { forkJoin, of } from 'rxjs';
import { post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/send_server';

interface createLinkProps {
  r_requisites_id: number;
  r_portfolio_ids: number[];
}

export default function createPortfolioToRequisites(body: createLinkProps) {
  const url = of(`PortfoliosToRequisites/createPortfolioToRequisitesLink`);
  return forkJoin([sendApiRequestInstanceObservable, url, of(body)]).pipe(
    post<boolean>(),
    transformAxios(),
    transformError(),
  );
}
