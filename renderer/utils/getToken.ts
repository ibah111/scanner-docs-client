import store from '../lib/store';

export interface Token {
  token: string;
}
export const getToken = () => {
  const result: Token = {
    token: store.get('token') as string,
  };
  return result;
};
