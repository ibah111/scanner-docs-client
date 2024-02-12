import path from 'path';
import { bpac_electron } from '@tools/bpac/electron_renderer';
import { from, mergeMap, of, tap } from 'rxjs';
import isPrintOnline from './isPrintOnline';

export default function printBarcode(barcode: string, title: string) {
  const bpac = bpac_electron();
  return of(title).pipe(
    isPrintOnline(),
    mergeMap(() => {
      const doc = bpac.IDocument;
      const barcode_path = path.join(
        window.getCwd(),
        'extensions',
        'test-barcode.lbx',
      );

      const opened = doc.Open(barcode_path);
      return from(opened).pipe(
        mergeMap(() => doc.GetObject('title')),
        tap((lbx) => {
          // Наименование к баркоду
          //  Наименование к баркоду
          lbx.Text = title;
          // Даю значение к штрихкоду
          doc.SetBarcodeData(0, barcode);
          // Принт функции
          doc.StartPrint('', 0);
          doc.PrintOut(1, 0);
          doc.EndPrint();
          doc.Close();
        }),
      );
    }),
  );
}
