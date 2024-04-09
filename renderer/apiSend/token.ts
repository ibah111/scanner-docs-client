import getStore from '../lib/store';

export default function storeToken() {
  const token = getStore().get('token');
  return token as string;
}
