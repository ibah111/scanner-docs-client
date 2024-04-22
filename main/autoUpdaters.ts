import { App, ipcMain, WebContents } from 'electron';
import { autoUpdater } from 'electron-updater';
import { LastAvailableVersion } from './utils';

export default function autoUpdaters(app: App, webContents: WebContents) {
  autoUpdater.autoDownload = false;

  autoUpdater.checkForUpdates().then((res) => {
    console.log('check for updates', res.updateInfo);
    return res;
  });
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
    const getVersion = (): string => {
      const version = app.getVersion();
      return version;
    };
    const currentVersion = getVersion();

    console.log(
      'check_version',
      `currentVersion ${currentVersion} // last available ${LastAvailableVersion}`,
    );
    autoUpdater.checkForUpdates().then((res) => {
      console.log('results', res);
      return res.updateInfo;
    });
  });
}
