import { App, dialog, ipcMain, WebContents } from 'electron';
import { autoUpdater } from 'electron-updater';
import { LastAvailableVersion } from './utils';

export default function autoUpdaters(app: App, webContents: WebContents) {
  autoUpdater.autoDownload = false;

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
      `CurrentVersion = ${currentVersion},\n LastAvailable = ${LastAvailableVersion}`,
    );

    webContents.send('version', getVersion());

    dialog.showMessageBox({
      title: 'Version',
      message: `Current application verison: ${getVersion()}`,
    });
    if (
      process.env.NODE_ENV === 'production' &&
      currentVersion != LastAvailableVersion
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
      currentVersion === LastAvailableVersion
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
