import config from '../config/server.json';
export default function server(name?: string) {
  return config.server;
}
