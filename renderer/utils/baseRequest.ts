import axios from 'axios';
import server from './server';
import { of } from 'rxjs';

export const baseRequestInstance = axios.create({
  baseURL: server(),
});
export const baseRequest = of(baseRequestInstance);
