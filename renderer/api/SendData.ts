import { store } from '../Reducer';
import { Transmit } from '../Schemas/Transmit.model';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import moment from 'moment';

export default async function SendData(data: {
  WhereSend: string;
  DateSend: moment.Moment;
}) {
  const id = store.getState().DocArray[0].id;
  const url = of('/send');
  console.log('SendData: => ', data);
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        id,
        DateSend: data.DateSend,
        WhereSend: data.WhereSend,
      }),
    ]).pipe(post<Transmit>(), transformAxios(), transformError(), authRetry()),
  );
}
