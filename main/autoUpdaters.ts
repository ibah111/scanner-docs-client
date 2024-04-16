import { App, dialog, ipcMain, WebContents } from 'electron';
import { autoUpdater } from 'electron-updater';

export default function autoUpdaters(app: App, webContents: WebContents) {
  autoUpdater.autoDownload = false;
  ipcMain.on('update-download', () => {
    autoUpdater.downloadUpdate();
  });
  ipcMain.on('update-install', () => {
    autoUpdater.quitAndInstall();
  });
  autoUpdater.on('update-available', (info) => {
    webContents.send('update-available', info);
  });
  autoUpdater.on('error', (err) => {
    webContents.send('message-error', err);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    webContents.send('download-progress', progressObj.percent);
  });
  autoUpdater.on('update-downloaded', () => {
    webContents.send('update-downloaded');
  });

  ipcMain.on('check_version', function () {
    dialog.showMessageBox({
      message: 'some kinda message',
    });
    console.log('Checking version');
    const getVersion = (): string => {
      const version = app.getVersion();
      console.log('ipcMain.on => checking version', version);
      return version;
    };
    webContents.send('version', getVersion());
    autoUpdater.checkForUpdates().then((res) => {
      console.log('AutoUpdater => check for updates promise result\n', res);
      return res;
    });
  });
}
