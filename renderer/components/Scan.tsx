import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { PortInfo } from '@serialport/bindings-cpp';
import { useAppDispatch } from '../Reducer';
import { setDocArray, resetDocArray } from '../Reducer/DocArray';
import getData from '../api/getData';
import { resetSend } from '../Reducer/SendDoc';
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import { setBarcodeState } from '../Reducer/Barcode';
import { setContract, setName } from '../Reducer/Search';
import search from '../apiSend/Search/search';
import { setLoadingResults, setResults } from '../Reducer/Results';

export default function Scan() {
  const [ports, setPorts] = React.useState<PortInfo[]>([]);
  const [connected, setConnected] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const unsubscribe: (() => void)[] = [];
    unsubscribe.push(
      window.ipc.on('ports', (_, args) => {
        setPorts(args);
      }),
    );
    unsubscribe.push(
      window.ipc.on('content', (_, args: string) => {
        const code = args.replace('\r', '');
        console.log('ResetDocArray while using scan');
        dispatch(resetDocArray());
        dispatch(resetSend());
        dispatch(
          setBarcodeState({
            code,
          }),
        );
        getData(code).subscribe((res) => {
          dispatch(setDocArray(res));
          const resObj = res[0].DocData.Result;
          dispatch(setName(resObj.fio_dol));
          dispatch(setContract(resObj.kd));
          search().subscribe({
            next: (res) => {
              dispatch(setResults(res));
              dispatch(setLoadingResults(false));
            },
            error: () => {
              setLoadingResults(false);
            },
          });
        });
      }),
    );
    unsubscribe.push(
      window.ipc.on('errorConnect', () => {
        setConnected(false);
      }),
    );
    unsubscribe.push(
      window.ipc.on('successConnect', () => {
        setConnected(true);
      }),
    );
    unsubscribe.push(
      window.ipc.on('successDisconnect', () => {
        setConnected(false);
      }),
    );
    window.ipc.send('requestPort');
    return () => {
      unsubscribe.forEach((func) => func());
    };
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {!connected ? (
        <>
          <Button
            id="basic-button"
            color="inherit"
            onClick={handleClick}
            variant="text"
          >
            <PowerIcon fontSize="large" />
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose} sx={{ width: '180px' }}>
              <em>Нет</em>
            </MenuItem>
            {ports.map((port, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  window.ipc.send('connectPort', port.path);
                }}
              >
                {port.path}
              </MenuItem>
            ))}
            <MenuItem
              onClick={() => {
                window.ipc.send('requestPort');
              }}
              sx={{ width: '180px' }}
            >
              <em>Обновить</em>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              window.ipc.send('disconnectPort');
            }}
            color="inherit"
            variant="text"
          >
            <PowerOffIcon fontSize="large" />
          </Button>
        </>
      )}
    </>
  );
}
