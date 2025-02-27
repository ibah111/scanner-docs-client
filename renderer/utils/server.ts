import config from '../config/server.json';
/**
 *
 * @param name "server": "http://balezin.usb.ru:3003",
 */
export default function server(name?: string) {
  switch (name) {
    case 'oauth':
      return config.oauth;
    default:
      if (process.env.NODE_ENV === 'production') {
        return config.server;
      } else {
        return 'http://balezin.usb.ru:3003';
      }
  }
}
