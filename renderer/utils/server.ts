import config from '../config/server.json';
export default function server() {
  let prot;
  switch (config.protocol) {
    case 'http':
      prot = 'http';
      break;
    case 'ssl':
      prot = 'https';
      break;
    default:
      prot = 'http';
      break;
  }
  return `${prot}://${config.server}:${config.port}`;
}
