import { Button } from '@mui/material';
import { ipcRenderer } from 'electron';
import store from '../../lib/store';
import { useAppDispatch } from '../../Reducer';
import { resetLogin } from '../../Reducer/State';

const OpenInBrowser = () => {
  return new Promise<string>((resolve, reject) => {
    ipcRenderer.send(
      'OpenInBrowser',
      'https://chat.nbkfinance.ru/apps/scanner-docs/login.php',
    );
    let error = true;
    ipcRenderer.on('getToken', (event, value: string) => {
      error = false;
      resolve(value);
    });
    setTimeout(() => {
      if (error) reject('Токен не был получен в течении 10 секунд');
    }, 10000);
  });
};

export default function Authorization() {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        OpenInBrowser().then((value) => {
          store.set('token', value);
          dispatch(resetLogin());
        });
      }}
    >
      Авторизация
    </Button>
  );
}
