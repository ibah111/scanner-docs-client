import { Observable } from 'rxjs';
import server from '../../utils/server';
export function getTokenFromAtlas(): Observable<string> {
  return new Observable<string>((subscriber) => {
    window.ipc.send(
      'OpenInBrowser',
      server('oauth') + '?port=11712&name=docs-scanner',
    );
    let error = true;
    window.ipc.once('getToken', (event, value: string) => {
      error = false;
      subscriber.next(value);
      subscriber.complete();
    });
    setTimeout(() => {
      if (error) {
        subscriber.error('Токен не был получен в течении 10 секунд');
      } else {
        subscriber.complete();
      }
    }, 10000);
  });
}
