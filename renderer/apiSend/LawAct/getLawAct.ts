import { PersonAddress } from '../Search/search';
import { defer, forkJoin, of } from 'rxjs';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import { sendApiRequestInstanceObservable } from '../../utils/sendUtils/requests';
import { store } from '../../Reducer';
export class LawActPlain {
  'id': number;
  'typ': number;
  'StatusDict.name': string;
  'ActStatusDict.name': string;
  'LawActPersonLink.DebtGuarantor.fio'?: string;
  'Person.fio': string;
  'Person.id': number;
  'Person.f': string;
  'Person.i': string;
  'Person.o': string;
  'Person.Addresses': PersonAddress[];
  'Portfolio.name': string;
  'Debt.id': number;
  'Debt.contract': string;
  'Debt.debt_sum': number;
  'Debt.status': number;
  'Debt.StatusDict.name': string;
}
const url = of('/search_la');
const data = defer(() => of(store.getState().Search));
export default function search() {
  return forkJoin([sendApiRequestInstanceObservable, url, data]).pipe(
    post<LawActPlain[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}
