import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import type Conf from 'conf';

const ipcHandler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send(channel: string, ...args: any[]) {
    ipcRenderer.send(channel, ...args);
  },
  on(
    channel: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (_event: IpcRendererEvent, ...args: any[]) => void,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = (_event: IpcRendererEvent, ...args: any[]) =>
      callback(_event, ...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  once(
    channel: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (_event: IpcRendererEvent, ...args: any[]) => void,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = (_event: IpcRendererEvent, ...args: any[]) =>
      callback(_event, ...args);
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
contextBridge.exposeInMainWorld('getCwd', () =>
  ipcRenderer.sendSync('get-cwd'),
);
export class StoreConfig {
  token?: string;
}
contextBridge.exposeInMainWorld('ipc', ipcHandler);

export type IpcHandler = typeof ipcHandler;
export type StoreHandler = Conf<StoreHandler>;
