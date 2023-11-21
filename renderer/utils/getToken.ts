import getStore from '../lib/store';

export interface Token {
  token: string;
}
export const getToken = () => {
  const result: Token = {
    token: getStore().get('token') as string,
  };
  return result;
};
