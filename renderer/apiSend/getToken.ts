import axios from 'axios';
import server from '../utils/server';
import { forkJoin, map, mergeMap, of } from 'rxjs';
import { post, transformAxios, get } from '@tools/rxjs-pipes/axios';
const requests = of(
  axios.create({
    baseURL: server('oauth'),
    withCredentials: true,
  }),
);
const urlCheck = of('oauth/check');
export function checkToken(token: string) {
  return forkJoin([requests, urlCheck, of({ token })]).pipe(
    post<boolean>(),
    transformAxios(),
  );
}
const urlAuthorize = of('oauth/authorize');
export function authorize() {
  return forkJoin([requests, urlAuthorize]).pipe(
    get<string | false>(),
    transformAxios(),
  );
}
export function redirect() {
  document.location.replace(
    server('oauth') + `/oauth/authorize?origin=${window.location.href}`,
  );
}
export function getLogin() {
  return authorize().pipe(
    map((result) => {
      if (result) return result;
      redirect();
      throw Error('Переадресация не прошла');
    }),
  );
}
export default function getToken() {
  return getLogin().pipe(
    mergeMap((token) => {
      return checkToken(token).pipe(
        map((result) => {
          if (!result) redirect();
          return token;
        }),
      );
    }),
  );
}
const urlLogout = of('oauth/logout');
export function logout() {
  return forkJoin([requests, urlLogout]).pipe(get());
}
