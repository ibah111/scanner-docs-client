import { io } from 'socket.io-client';
import server from '../utils/server';
const sockets = {};
const createSocket = (name) => {
  const socket = io(server());
  sockets[name] = socket;
  return socket;
};
const getSocket = (name) => {
  return sockets[name] !== undefined ? sockets[name] : createSocket(name);
};
export const socketConnect = (name?) => {
  const namespace = name === undefined ? '' : name;
  return getSocket(namespace);
};
