import axios from 'axios';
import server from './server';
import store from '../lib/store';

export const requests = axios.create({
  baseURL: server(),
  headers: { token: store.get('token') as string },
});
