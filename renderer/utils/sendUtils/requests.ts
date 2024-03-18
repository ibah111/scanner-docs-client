import axios from 'axios';
import send_cfg from '../../config/server.json';
import { of } from 'rxjs';

function send_server(): string {
  return process.env.NODE_ENV === 'production'
    ? send_cfg.server_production
    : send_cfg.server_development;
}
export const sendApiRequestInstance = of(
  axios.create({
    baseURL: send_server(),
  }),
);
