import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Grid, IconButton } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import createIp from '../../../../../../../apiSend/createIp';
import saveId from '../../../../../../../apiSend/saveId';

class Props {
  disabled: boolean;
}

export default function AdditionalMenu({ disabled }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item>
      <IconButton
        disabled={!disabled}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
      >
        <ListIcon color={!disabled ? 'inherit' : 'info'} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/**
         * save pdf
         */}
        <MenuItem
          onClick={async () => {
            createIp().subscribe(() => {
              console.log('after sub');
            });
          }}
        >
          Создать ИП
        </MenuItem>
        {/**
         * send without pdf
         */}
        <MenuItem onClick={() => saveId().subscribe()}>Сохранить ИД</MenuItem>
      </Menu>
    </Grid>
  );
}
