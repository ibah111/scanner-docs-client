import axios from 'axios';
import send_cfg from '../../config/server.json';
import { of } from 'rxjs';

function send_server(): string {
  return process.env.NODE_ENV === 'production'
    ? send_cfg.send_api_prod
    : send_cfg.send_api_dev;
}
export const sendApiRequestInstance = of(
  axios.create({
    baseURL: send_server(),
  }),
);
