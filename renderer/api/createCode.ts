import { bpac_electron } from '@tools/bpac';
import axios, { AxiosError } from 'axios';
import printBarcode from '../lib/printBarcode';
import { store } from '../Reducer';
import { resetDocs } from '../Reducer/Docs';
import { callError, callSuccess } from '../Reducer/Message';
import { DocData } from '../Schemas/DocData.model';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export default async function createCode() {
  const data = store.getState().Box;
  const bpac = bpac_electron();
  const doc = bpac.IDocument;
  const printerName = await doc.GetPrinterName();
  const printer = new bpac.IPrinter('');
  const is_online = await printer.IsPrinterOnline(printerName);
  if (printerName == 'Brother QL-800' && is_online) {
    try {
      const result = await axios.post<DocData>(server() + '/createBox', {
        ...getToken(),
        ...data,
      });
      printBarcode(String(result.data));
      store.dispatch(callSuccess('Штрих-код успешно создан'));
      store.dispatch(resetDocs());
      return result.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        store.dispatch(callError(e.response.data.message));
      }
      throw e;
    }
  } else {
    store.dispatch(callError('Подключите принтер Brother QL-800'));
  }
}
