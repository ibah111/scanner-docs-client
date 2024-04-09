import { defer, forkJoin, of } from 'rxjs';
import { store } from '../../Reducer';
import { post, transformAxios, authRetry } from '@tools/rxjs-pipes/axios';
import { transformError } from '../../utils/processError';
import {
  sendApiRequestInstanceObservable,
  sendApiRequestInstancePromise,
} from '../../utils/sendUtils/requests';
import storeToken from '../token';
export class PersonAddress {
  full_adr: string;
}
export class LawExecPlain {
  'id': number;
  'court_doc_num': string;
  'executive_typ': number;
  'fssp_doc_num': string;
  'court_date': Date;
  'entry_force_dt': Date;
  'StateDict.name': string;
  'LawExecPersonLink.DebtGuarantor.fio'?: string;
  'LawAct.id': number;
  'LawAct.typ': number;
  'LawAct.StatusDict.name': string;
  'LawAct.ActStatusDict.name': string;
  'Portfolio.name': string;
  'ExecutiveTyp.name': string;
  'Debt.id': number;
  'Debt.contract': string;
  'Debt.debt_sum': number;
  'Debt.status': number;
  'Debt.StatusDict.name': string;
  'Person.fio': string;
  'Person.id': number;
  'Person.f': string;
  'Person.i': string;
  'Person.o': string;
  'Person.Addresses': PersonAddress[];
}
const url = '/search';
const urlObservable = of('/search');
const searchData = store.getState().Search;
const data = defer(() => of(searchData));
export default function search() {
  console.log(searchData);
  return forkJoin([sendApiRequestInstanceObservable, urlObservable, data]).pipe(
    post<LawExecPlain[]>(),
    transformAxios(),
    transformError(),
    authRetry(),
  );
}

export async function searchPromise(): Promise<LawExecPlain[]> {
  const token = storeToken();
  console.log('token in search promise', token);
  const request = await sendApiRequestInstancePromise.post<LawExecPlain[]>(
    url,
    searchData,
    {
      headers: { token },
    },
  );
  console.log(request);
  return request.data;
}
