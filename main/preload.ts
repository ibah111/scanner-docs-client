import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const ipcHandler = {
  send(channel: string, ...args: any[]) {
    ipcRenderer.send(channel, ...args);
  },
  on(channel: string, callback: (...args: any[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: any[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  once(channel: string, callback: (...args: any[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: any[]) =>
      callback(...args);
    ipcRenderer.once(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};
contextBridge.exposeInMainWorld('store', {
  get(key) {
    return ipcRenderer.sendSync('electron-store-get', key);
  },
  set(property, val) {
    ipcRenderer.send('electron-store-set', property, val);
  },
});
export class StoreConfig {
  token?: string;
}
contextBridge.exposeInMainWorld('ipc', ipcHandler);

export type IpcHandler = typeof ipcHandler;
export interface StoreHandler<T extends Record<string, unknown>> {
  get<Key extends keyof T>(key: Key): T[Key];
  set<Key extends keyof T>(key: Key, value: T[Key]): void;
}
