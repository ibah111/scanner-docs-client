import { store } from '../Reducer';
import { Transmit } from '../Schemas/Transmit.model';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';

export default async function SendData() {
  const data = store.getState().Send;
  const id = store.getState().Data[0].id;

  const url = of('/send');
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        ...data,
        id,
      }),
    ]).pipe(post<Transmit>(), transformAxios(), transformError(), authRetry()),
  );
}
