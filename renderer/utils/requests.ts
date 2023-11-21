import axios from 'axios';
import server from './server';

export const requests = axios.create({
  baseURL: server(),
});
