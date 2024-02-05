import path from 'path';
import { bpac_electron } from '@tools/bpac/electron_renderer';
import { from, mergeMap, of, tap } from 'rxjs';
import isPrintOnline from './isPrintOnline';
export default function printBarcode(text: string, title?: string) {
  const bpac = bpac_electron();
  return of(text).pipe(
    isPrintOnline(),
    mergeMap(() => {
      const doc = bpac.IDocument;
      const barcode_file = path.join(
        window.getCwd(),
        'extensions',
        'test-barcode.lbx',
      );
      return from(doc.Open(barcode_file)).pipe(
        mergeMap(() => doc.GetObject('text')),
        tap((lbx) => {
          // Наименование к баркоду
          lbx.Text = String(title) || '';
          // Даю значение к штрихкоду
          doc.SetBarcodeData(0, String(text));
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
