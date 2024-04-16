import { ipcMain } from 'electron';
import Store from 'electron-store';
/**
 * Инициализация "магазина"(стора) на стороне сервера
 */
export const electronStore = new Store();
export function StoreInit() {
  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = electronStore.get(val);
  });
  ipcMain.on('electron-store-set', async (event, key, val) => {
    electronStore.set(key, val);
  });
}
