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
import getStore from '../lib/store';
import { post, transformAxios } from '@tools/rxjs-pipes/axios';
import { requests } from '../utils/requests';
import axios from 'axios';
import server from '../utils/server';
export function getTokenFromAtlas(): Observable<string> {
  return new Observable<string>((subscriber) => {
    window.ipc.send(
      'OpenInBrowser',
      server('oauth') + '?port=11712&name=docs-scanner',
    );
    let error = true;
    window.ipc.once('getToken', (event, value: string) => {
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
      getStore().set('token', token);
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
    map(() => getStore().get('token') || null),
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
            getStore().set('token', null);
            if (requireToken) return of(null);
          }
        }
        return EMPTY;
      },
    }),
  );
}
