import path from 'path';
import bpac_electron from '@tools/bpac';
import { store } from '../Reducer';
import { callError } from '../Reducer/Message';
export default async function printBarcode(text: string) {
  const bpac = bpac_electron();
  const doc = bpac.IDocument;
  const remote = await import('@electron/remote');
  const barcode_file = path.join(
    remote.process.cwd(),
    'extensions',
    'barcode.lbx',
  );

  const printerName = await doc.GetPrinterName();
  const printer = new bpac.IPrinter('');
  const is_online = await printer.IsPrinterOnline(printerName);
  try {
    if (printerName == 'Brother QL-800' && is_online) {
      await doc.Open(barcode_file);
      const barcode = await doc.GetObject('barcode');
      barcode.Text = text;
      doc.StartPrint('', 0);
      doc.PrintOut(1, 0);
      doc.EndPrint();
      doc.Close();
    } else {
      store.dispatch(callError('Подключите принтер Brother QL-800'));
    }
  } catch (e) {
    store.dispatch(callError(e.response.data.message));
  }
}
