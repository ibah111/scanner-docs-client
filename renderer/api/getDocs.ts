import axios from 'axios';
import { store } from '../Reducer';
import { DocsState } from '../Reducer/Docs';
import { callError } from '../Reducer/Message';
import server from '../utils/server';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { authRetry, get, post, transformAxios } from '@tools/rxjs-pipes';
import { baseRequest } from '../utils/baseRequest';
import { transformError } from '../utils/processError';

export default async function getDocs() {
  const data = store.getState().DocsComponent;

  const url = of('/getDocs');
  return lastValueFrom(
    forkJoin([baseRequest, url]).pipe(
      get<DocsState>(),
      transformAxios(),
      transformError(),
      authRetry(),
    ),
  );
}
