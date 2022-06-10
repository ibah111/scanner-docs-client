import { ipcMain, WebContents } from "electron";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
export default function events(webContents: WebContents) {
  const start = async () => {
    //webContents.send("ports", await SerialPort.list());
    ipcMain.on("requestPort", async () => {
      const ports = await SerialPort.list();
      webContents.send("ports", ports);
    });
    ipcMain.on("connectPort", (event, path: string) => {
      const port = new SerialPort({ path, baudRate: 9600 });

      port.on("open", () => {
        webContents.send("successConnect");
        port.on("data", (chunk) => {
          webContents.send("content", chunk.toString());
        });
      });
      port.on("error", (event) => {
        webContents.send("errorConnect", event);
      });
    });
  };
  start();
}
