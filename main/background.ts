import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import events from "./events";
import { tz } from "moment-timezone";

const isProd: boolean = process.env.NODE_ENV === "production";
if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  app.on(
    "certificate-error",
    (event, webContents, url, error, certificate, callback) => {
      // On certificate error we disable default behaviour (stop loading the page)
      // and we then say "it is all fine - true" to the callback
      event.preventDefault();
      callback(true);
    }
  );
  await app.whenReady();
  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });
  events(mainWindow.webContents);
  if (isProd) {
    await mainWindow.loadURL("app://./MainPage.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/MainPage`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
