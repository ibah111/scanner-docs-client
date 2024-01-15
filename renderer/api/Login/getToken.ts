import axios from 'axios';
import { Observable, of, map, mergeMap, retry, EMPTY } from 'rxjs';
import { AuthUserSuccess } from '../../Schemas/Auth';
import getStore from '../../lib/store';
import { checkLogin } from './checkLogin';
import { getTokenFromAtlas } from './getTokenFromAtlas';

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
