import path from 'path';
import * as bpac from './bpac';
import connect_bpac from './connect_bpac';
export default async function printBarcode(text: string) {
  console.log('start');
  if (bpac.IsExtensionInstalled() == false) {
    await connect_bpac();
  }
  if (bpac.IsExtensionInstalled() == true) {
    const doc = bpac.IDocument;
    console.log('remote');
    const remote = await import('@electron/remote');
    console.log('path');
    const barcode_file = path.join(
      remote.process.cwd(),
      'extensions',
      'barcode.lbx',
    );
    console.log(barcode_file);
    console.log(remote.session.defaultSession.serviceWorkers.getAllRunning());
    try {
      const printerName = await doc.GetPrinterName();
      console.log(printerName);
      //const printer = await doc.Printer;
      const res = await doc.Open(barcode_file);
      console.log(res);
      console.log('get object');
      const barcode = await doc.GetObject('barcode');
      console.log('set text');
      barcode.Text = text;
      console.log('printing');
      await doc.StartPrint('', 0);
      await doc.PrintOut(1, 0);
      await doc.EndPrint();
      await doc.Close();
    } catch (e) {
      console.log(e);
    }
  }
}
