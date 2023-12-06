import { bpac_electron } from '@tools/bpac/electron_renderer';
import { enqueueSnackbar } from 'notistack';
import { from, map, mergeMap, of } from 'rxjs';
const printers = ['Brother QL-800'];
export default function isPrintOnline<T>() {
  return mergeMap((value: T) =>
    of(value).pipe(
      () => {
        const bpac = bpac_electron();
        const doc = bpac.IDocument;
        return from(doc.GetPrinterName()).pipe(
          mergeMap((printerName) => {
            const printer = new bpac.IPrinter('');
            return from(printer.IsPrinterOnline(printerName)).pipe(
              map((isOnline) => ({
                isOnline,
                printerName,
                printer,
              })),
            );
          }),
        );
      },
      map((data) => {
        if (!(data.isOnline && printers.includes(data.printerName)))
          enqueueSnackbar('Принтер не подключен', {
            variant: 'error',
          });
      }),
      map(() => value),
    ),
  );
}
