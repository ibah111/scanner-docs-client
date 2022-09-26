import { app, ipcMain } from 'electron';
import Store from 'electron-store';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import events from './events';
import autoUpdaters from './autoUpdaters';
import { singleEvents } from './singleEvents';
import { document_electron_main } from '@tools/bpac';
require('@electron/remote/main').initialize();
const isProd: boolean = process.env.NODE_ENV === 'production';
if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  app.on(
    'certificate-error',
    (event, webContents, url, error, certificate, callback) => {
      // On certificate error we disable default behaviour (stop loading the page)
      // and we then say "it is all fine - true" to the callback
      event.preventDefault();
      callback(true);
    },
  );

  await app.whenReady();
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
    frame: false,
  });
  document_electron_main(mainWindow.webContents);
  Store.initRenderer();
  require('@electron/remote/main').enable(mainWindow.webContents);
  events(mainWindow.webContents);
  autoUpdaters(app, mainWindow.webContents);
  singleEvents(mainWindow.webContents);

  if (isProd) {
    await mainWindow.loadURL('app://./MainPage.html');
    mainWindow.webContents.openDevTools();
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/MainPage`);
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on('close', () => {
    mainWindow.close();
  });

  ipcMain.on('minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.on('size', () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  });
})();
app.on('window-all-closed', () => {
  app.quit();
});
