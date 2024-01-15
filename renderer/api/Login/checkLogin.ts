import { post, transformAxios } from '@tools/rxjs-pipes';
import { of, OperatorFunction, pipe, tap, share, forkJoin, map } from 'rxjs';
import { AuthUserSuccess } from '../../Schemas/Auth';
import getStore from '../../lib/store';
import { baseRequestInstance, baseRequest } from '../../utils/baseRequest';

const url_login = of('/login');
export function checkLogin(): OperatorFunction<string, AuthUserSuccess> {
  return pipe(
    tap((token) => {
      console.log('token in check api call ===> ', token);
      getStore().set('token', token);
      baseRequestInstance.defaults.headers.token = token;
    }),
    share(),
    (obs) =>
      forkJoin([
        obs.pipe(() => baseRequest),
        obs.pipe(() => url_login),
        obs.pipe(map(() => null)),
      ]).pipe(post<AuthUserSuccess>(), transformAxios()),
  );
}
