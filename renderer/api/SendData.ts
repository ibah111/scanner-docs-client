import { Transmit } from '../Schemas/Transmit.model';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';
import moment from 'moment';

class SendDataClass {
  id: number;
  WhereSend: string;
  DateSend: moment.Moment;
  BoxTypeId: number;
}

export default async function SendData({
  id,
  WhereSend,
  DateSend,
  BoxTypeId,
}: SendDataClass) {
  const url = of('/send');
  console.log(id, WhereSend, DateSend);
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        id,
        WhereSend,
        DateSend,
        BoxTypeId,
      }),
    ]).pipe(post<Transmit>(), transformAxios(), transformError(), authRetry()),
  );
}
