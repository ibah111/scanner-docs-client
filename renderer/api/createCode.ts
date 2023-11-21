import { bpac_electron } from '@tools/bpac';
import axios from 'axios';
import printBarcode from '../lib/printBarcode';
import { store } from '../Reducer';
import { callError, callSuccess } from '../Reducer/Message';
import { resetRowDoc } from '../Reducer/RowDoc';
import { DocData } from '../Schemas/DocData.model';
import server from '../utils/server';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { baseRequest } from '../utils/baseRequest';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import { transformError } from '../utils/processError';

const url = of('/createBox');
export default async function createCode() {
  const data = store.getState().Box;
  const bpac = bpac_electron();
  const doc = bpac.IDocument;
  const printerName = await doc.GetPrinterName();
  const printer = new bpac.IPrinter('');
  const is_online = await printer.IsPrinterOnline(printerName);
  if (printerName == 'Brother QL-800' && is_online) {
    return lastValueFrom(
      forkJoin([
        baseRequest,
        url,
        of({
          ...data,
        }),
      ]).pipe(post<DocData>(), transformAxios(), transformError(), authRetry()),
    )
      .then((res) => {
        printBarcode(String(res));
        store.dispatch(callSuccess('Штрих-код успешно создан'));
        store.dispatch(resetRowDoc());
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          store.dispatch(callError(e.response.data.message));
        }
        throw e;
      });
  } else {
    store.dispatch(callError('Подключите принтер Brother QL-800'));
  }
}
