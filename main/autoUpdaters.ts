import { App, ipcMain, WebContents } from 'electron';
import { autoUpdater } from 'electron-updater';

export default function autoUpdaters(app: App, webContents: WebContents) {
  autoUpdater.autoDownload = false;

  autoUpdater.on('error', (err) => {
    webContents.send('message-error', err);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    webContents.send('download-progress', progressObj.percent);
  });
  ipcMain.on('update-download', () => {
    autoUpdater.downloadUpdate();
  });
  ipcMain.on('update-install', () => {
    autoUpdater.quitAndInstall();
  });
  autoUpdater.on('update-downloaded', () => {
    webContents.send('update-downloaded');
  });
  ipcMain.on('check_version', async function () {
    autoUpdater.checkForUpdates().then((res) => {
      console.log('results', res);
      return res.updateInfo;
    });
  });
}
