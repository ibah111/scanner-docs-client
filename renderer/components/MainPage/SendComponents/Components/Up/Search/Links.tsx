import { Button, Grid, Menu, MenuItem, MenuList } from '@mui/material';
import React from 'react';
import OSPCalcs from './OSPCalcs';

interface LinkMenuItemProps {
  menuItemName: string;
  url: string;
}

export function LinkMenuItem({ menuItemName, url }: LinkMenuItemProps) {
  return (
    <MenuItem
      onClick={() => {
        window.ipc.send('OpenInBrowser', url);
      }}
    >
      {menuItemName}
    </MenuItem>
  );
}

export default function Links() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Grid item>
      <Button onClick={handleClick} color={'warning'} variant="outlined">
        Ссылки
      </Button>
      {open && (
        <Menu
          open={open}
          onClose={handleClose}
          id={'links-menu'}
          anchorEl={anchorEl}
        >
          <MenuList>
            {/**
             * Расчёт ОСП
             */}
            <OSPCalcs />
            {/**
             * Определение ОСП с сайта ФССП
             */}
            <LinkMenuItem
              menuItemName={'Определение ОСП с сайта ФССП'}
              url={'https://old.fssp.gov.ru/osp/'}
            />
            {/**
             * Ссылка на сайт 2gis.ru
             */}
            <LinkMenuItem menuItemName={'2gis'} url={'https://2gis.ru/kirov'} />
            {/**
             * Ссылка на сайт ФНС Предоставление сведений из ЕГРЮЛ/ЕГРИП в электронном виде
             */}
            <LinkMenuItem
              menuItemName={'ЕГРЮЛ-Налог'}
              url={'https://egrul.nalog.ru/index.html'}
            />
            {/**
             *
             */}
            <LinkMenuItem
              menuItemName={'КАД.Арбитр'}
              url={'https://kad.arbitr.ru/'}
            />
          </MenuList>
        </Menu>
      )}
    </Grid>
  );
}
