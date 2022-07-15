import { ipcMain, WebContents } from "electron";
import { SerialPort } from "serialport";
export default function events(webContents: WebContents) {
  const start = async () => {
    let connected = false;
    //webContents.send("ports", await SerialPort.list());
    ipcMain.on("requestPort", async () => {
      if (connected) {
        webContents.send("successConnect");
      }
      const ports = await SerialPort.list();
      webContents.send("ports", ports);
    });
    ipcMain.on("connectPort", (event, path: string) => {
      const port = new SerialPort({ path, baudRate: 9600 });

      port.on("open", () => {
        connected = true;
        webContents.send("successConnect");
        port.on("data", (chunk) => {
          webContents.send("content", chunk.toString());
        });
      });
      port.on("error", (event) => {
        webContents.send("errorConnect", event);
      });
      ipcMain.once("disconnectPort", () => {
        port.close();
        webContents.send("successDisconnect");
      });
      port.on("close", () => {
        connected = false;
      });
    });
  };
  start();
}
