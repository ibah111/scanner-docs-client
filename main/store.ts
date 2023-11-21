import { ipcMain } from 'electron';
import Store from 'electron-store';
export function StoreInit() {
  const store = new Store();
  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = store.get(val);
  });
  ipcMain.on('electron-store-set', async (event, key, val) => {
    store.set(key, val);
  });
}
