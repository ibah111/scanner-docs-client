import axios from 'axios';
import send_cfg from '../../config/server.json';
import { of } from 'rxjs';

export function send_server(): string {
  return send_cfg.send_server;
}
export const sendApiRequestInstanceObservable = of(
  axios.create({
    baseURL: send_server(),
  }),
);

export const sendApiRequestInstancePromise = axios.create({
  baseURL: send_server(),
});
