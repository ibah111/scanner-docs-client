import { App, dialog, ipcMain, WebContents } from 'electron';
import { autoUpdater } from 'electron-updater';
import gitSemverTags from 'git-semver-tags';

export const lastAvailableVersion = await gitSemverTags().then(
  (tags) => tags[0],
);

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

  ipcMain.on('check_version', async function () {
    const getVersion = (): string => {
      const version = app.getVersion();
      console.log('ipcMain.on => checking version', version);
      return version;
    };
    /**
     * getting current version and latest
     */
    const currentVersion = getVersion();
    console.log(
      `CurrentVersion = ${currentVersion},\n LastAvailable = ${lastAvailableVersion}`,
    );

    webContents.send('version', getVersion());

    dialog.showMessageBox({
      title: 'Version',
      message: `Current application verison: ${getVersion()}`,
    });
    if (
      process.env.NODE_ENV === 'production' &&
      currentVersion != lastAvailableVersion
    ) {
      /**Here must be notification dialogs of downloading new version */
      dialog
        .showMessageBox({
          message: 'Versions are different',
          buttons: ['Download'],
        })
        .then((res) => {
          console.log('button result: ', res);
        });
      autoUpdater.quitAndInstall();
    } else if (
      process.env.NODE_ENV === 'production' &&
      currentVersion === lastAvailableVersion
    ) {
      dialog.showMessageBox({
        title: 'Version message',
        message: 'Your working on actual version',
      });
    }

    autoUpdater.checkForUpdates().then((res) => {
      return res;
    });
  });
}
