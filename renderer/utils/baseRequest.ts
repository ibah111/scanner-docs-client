import axios from 'axios';
import server from './server';

export const baseRequest = axios.create({
  baseURL: server(),
});
