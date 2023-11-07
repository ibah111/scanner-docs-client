import Store from 'electron-store';
export class StoreConfig {
  token?: string;
}
const store = new Store<StoreConfig>();
export default store;
