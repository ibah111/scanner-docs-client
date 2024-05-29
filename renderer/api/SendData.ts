import { Transmit } from '../Schemas/Transmit.model';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import moment from 'moment';

export default async function SendData(data: {
  id: number;
  WhereSend: string;
  DateSend: moment.Moment;
}) {
  const url = of('/send');
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        id: data.id,
        DateSend: data.DateSend,
        WhereSend: data.WhereSend,
      }),
    ]).pipe(post<Transmit>(), transformAxios(), transformError(), authRetry()),
  );
}
