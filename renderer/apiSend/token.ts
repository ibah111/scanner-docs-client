import { Observable, of } from 'rxjs';
import getStore from '../lib/store';
import { AxiosRequestConfig } from 'axios';

export function storeToken() {
  const token = getStore().get('token') as string;
  return token;
}
export function axiosConfig(): Observable<AxiosRequestConfig> {
  return of({
    headers: {
      token: storeToken(),
    },
  });
}
