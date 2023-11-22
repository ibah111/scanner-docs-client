import { IpcHandler, StoreHandler } from '../main/preload';

declare global {
  interface Window {
    ipc: IpcHandler;
    store: StoreHandler;
  }
}
