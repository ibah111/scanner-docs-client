import axios from 'axios';
import send_cfg from '../../config/server.json';
import { of } from 'rxjs';

/**
 *
 * "send_server": "http://balezin.usb.ru:3006"
 */
export function send_server(): string {
  if (process.env.NODE_ENV === 'production') {
    return send_cfg.send_server;
  } else {
    return 'http://balezin.usb.ru:3006';
  }
}
export const sendApiRequestInstanceObservable = of(
  axios.create({
    baseURL: send_server(),
  }),
);
export const sendApiRequestInstancePromise = axios.create({
  baseURL: send_server(),
});
