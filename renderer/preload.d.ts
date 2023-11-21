import { IpcHandler, StoreHandler, StoreConfig } from '../main/preload';

declare global {
  interface Window {
    ipc: IpcHandler;
    store: StoreHandler<Store>;
  }
}
