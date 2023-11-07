import {
  EMPTY,
  Observable,
  OperatorFunction,
  forkJoin,
  map,
  mergeMap,
  of,
  pipe,
  retry,
  share,
  tap,
} from 'rxjs';
import { AuthUserSuccess } from '../Schemas/Auth';
import store from '../lib/store';
import { post, transformAxios } from '@tools/rxjs-pipes/axios';
import { requests } from '../utils/requests';
import axios, { AxiosRequestConfig } from 'axios';
import server from '../utils/server';
import { ipcRenderer } from 'electron';
export function getTokenFromAtlas(): Observable<string> {
  return new Observable<string>((subscriber) => {
    ipcRenderer.send(
      'OpenInBrowser',
      server('oauth') + '?port=11712&name=docs-scanner',
    );
    let error = true;
    ipcRenderer.once('getToken', (event, value: string) => {
      error = false;
      subscriber.next(value);
      subscriber.complete();
    });
    setTimeout(() => {
      if (error) {
        subscriber.error('Токен не был получен в течении 10 секунд');
      } else {
        subscriber.complete();
      }
    }, 10000);
  });
}
export function checkLogin(): OperatorFunction<string, AuthUserSuccess> {
  return pipe(
    tap((token) => {
      store.set('token', token);
      requests.defaults.headers.token = token;
    }),
    share(),
    (obs) =>
      forkJoin([
        obs.pipe(map(() => requests)),
        obs.pipe(map(() => '/login')),
        obs.pipe(map(() => null)),
      ]).pipe(post<AuthUserSuccess>(), transformAxios()),
  );
}
export default function getToken(
  requireToken = false,
): Observable<AuthUserSuccess> {
  return of(null).pipe(
    map(() => store.get('token') || null),
    mergeMap((token) => {
      let obs = of(token);
      if (!token && requireToken) {
        obs = getTokenFromAtlas();
      }
      return obs.pipe(checkLogin());
    }),
    retry({
      delay: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            store.set('token', null);
            if (requireToken) return of(null);
          }
        }
        return EMPTY;
      },
    }),
  );
}
