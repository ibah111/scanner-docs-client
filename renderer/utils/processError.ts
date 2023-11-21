import axios from 'axios';
import { map, mergeMap, of } from 'rxjs';
import { store } from '../Reducer';
import { createError } from '@tools/rxjs-pipes';
import getToken from '../api/getToken';
import { callError } from '../Reducer/Message';
import { baseRequestInstance } from './baseRequest';
interface ResultError {
  addon?: string;
  e: unknown;
}
export default function processError(e: unknown, name?: string) {
  return of(e).pipe(
    map<unknown, ResultError>((e) => {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          if (e.response.status === 401) {
            return { e, addon: 'retry' };
          }
          store.dispatch(callError(e.message));
        }
      }
      return { e };
    }),
    mergeMap((result) => {
      if (result.addon === 'retry') {
        return getToken().pipe(
          map((token) => {
            if (token) {
              window.store.set('token');
              baseRequestInstance.defaults.headers.token = '';
              return result.addon;
            }
          }),
        );
      }
      return of(result.e);
    }),
  );
}
export const transformError = createError(processError);
