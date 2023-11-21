import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { PortInfo } from '@serialport/bindings-cpp';
import { useAppDispatch } from '../Reducer';
import { resetData, setData } from '../Reducer/Data';
import getData from '../api/getData';
import { resetSend } from '../Reducer/Send';
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';

export default function Scan() {
  const [ports, setPorts] = React.useState<PortInfo[]>([]);
  const [connected, setConnected] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    window.ipc.on('ports', (_, args) => {
      setPorts(args);
    });
    window.ipc.on('content', (_, args: string) => {
      dispatch(resetData());
      dispatch(resetSend());
      getData(args.replace('\r', '')).then((res) => {
        dispatch(setData(res));
      });
    });
    window.ipc.on('errorConnect', () => {
      setConnected(false);
    });
    window.ipc.on('successConnect', () => {
      setConnected(true);
    });
    window.ipc.on('successDisconnect', () => {
      setConnected(false);
    });
    window.ipc.send('requestPort');
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
