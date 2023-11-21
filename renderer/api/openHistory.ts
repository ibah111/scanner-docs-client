import axios from 'axios';
import { store } from '../Reducer';
import { callError } from '../Reducer/Message';
import { Log } from '../Schemas/Log.model';
import server from '../utils/server';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, get, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';

const url = of('/openHistory');
export default async function openHistory(code: number) {
  return lastValueFrom(
    forkJoin([baseRequest, url]).pipe(
      get<Log[]>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
