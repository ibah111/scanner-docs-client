import { ipcMain, WebContents } from 'electron';
import open from 'open';
import http from 'http';
import { createHttpTerminator } from 'http-terminator';
import url from 'url';
const headers = {
  'Access-Control-Allow-Origin': '*' /* @dev First, read about security */,
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days
  /** add other headers as per requirement */
};
export const singleEvents = (webContents: WebContents) => {
  ipcMain.on('OpenInBrowser', (event, value: string) => {
    open(value);
    let error = true;
    const server = http.createServer(async (req, res) => {
      if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
      }
      if (['GET', 'POST'].indexOf(req.method) > -1) {
        const query = url.parse(req.url, true).query;
        if (query.token) {
          webContents.send('getToken', query.token);
          res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
          });
          res.end('Вход успешно выполнен');
          error = false;
          await httpTerminator.terminate();
        } else {
          res.writeHead(200, headers);
          res.end('Ok');
        }
      }
    });
    const httpTerminator = createHttpTerminator({
      server,
    });
    server.listen(11712);
  });
};
