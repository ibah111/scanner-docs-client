import config from '../config/server.json';
export default function server(name?: string) {
  switch (name) {
    case 'oauth':
      return config.oauth;
    default:
      return process.env.NODE_ENV === 'production'
        ? config.server_production
        : config.server_development;
  }
}
