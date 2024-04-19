import axios from 'axios';
import server from '../../utils/server';
import { forkJoin, map, mergeMap, of } from 'rxjs';
import { post, transformAxios, get } from '@tools/rxjs-pipes/axios';
/**
 * При необходимости удалить
 */
const baseRequestsSend = of(
  axios.create({
    baseURL: server('oauth'),
  }),
);
const urlCheck = of('oauth/check');
export function checkTokenSend(token: string) {
  return forkJoin([baseRequestsSend, urlCheck, of({ token })]).pipe(
    post<boolean>(),
    transformAxios(),
  );
}
const urlAuthorize = of('oauth/authorize');
export function authorizeSend() {
  return forkJoin([baseRequestsSend, urlAuthorize]).pipe(
    get<string | false>(),
    transformAxios(),
  );
}
export function redirectSend() {
  document.location.replace(
    server('oauth') + `/oauth/authorize?origin=${window.location.href}`,
  );
}
export function getLoginSend() {
  return authorizeSend().pipe(
    map((result) => {
      if (result) return result;
      redirectSend();
      throw Error('Переадресация не прошла');
    }),
  );
}
export default function getTokenSend() {
  return getLoginSend().pipe(
    mergeMap((token) => {
      return checkTokenSend(token).pipe(
        map((result) => {
          if (!result) redirectSend();
          return token;
        }),
      );
    }),
  );
}
const urlLogoutSend = of('oauth/logout');
export function logout() {
  return forkJoin([baseRequestsSend, urlLogoutSend]).pipe(get());
}
