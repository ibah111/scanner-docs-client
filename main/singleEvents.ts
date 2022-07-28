import { ipcMain, WebContents } from "electron";
import open from "open";
import http from "http";
import { createHttpTerminator } from "http-terminator";
import url from "url";
export const singleEvents = (webContents: WebContents) => {
  ipcMain.on("OpenInBrowser", (event, value: string) => {
    open(value);
    let error = true;
    const server = http.createServer(async (req, res) => {
      const query = url.parse(req.url, true).query;
      webContents.send("getToken", query.token);
      res.writeHead(200);
      res.end("Вход успешно выполнен");
      error = false;
      await httpTerminator.terminate();
    });
    const httpTerminator = createHttpTerminator({
      server,
    });
    setTimeout(async () => {
      if (error) await httpTerminator.terminate();
    }, 10000);
    server.listen(11712);
  });
};
