import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Menu,
  MenuItem,
  MenuList,
  TextField,
} from '@mui/material';
import React from 'react';
import getLinks from '../../../../../../apiSend/Links/getLinks';
import LinkType from '../../../../../../apiSend/Links/LinkType';
import { enqueueSnackbar } from 'notistack';
import addLink from '../../../../../../apiSend/Links/addLink';

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
  const [links, setLinks] = React.useState<LinkType[]>([]);

  const open = Boolean(anchorEl);
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const openAddLinkDialog = React.useCallback(() => {
    setDialogOpen(true);
  }, []);

  const [linkName, setLinkName] = React.useState<string>('');
  const [linkUrl, setLinkUrl] = React.useState<string>('');

  const close_reset = () => {
    setDialogOpen(false);
    setLinkName('');
    setLinkUrl('');
  };
  const handleClick_addLink = () => {
    addLink({
      linkName,
      linkUrl,
    }).subscribe((res) => {
      if (res) {
        enqueueSnackbar('Ссылка создана', {
          variant: 'success',
        });
        close_reset();
      }
    });
  };

  React.useEffect(() => {
    getLinks().subscribe((links) => setLinks(links)).unsubscribe;
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
            {links.map(({ id, item_name, item_url }) => (
              <LinkMenuItem key={id} menuItemName={item_name} url={item_url} />
            ))}
            <MenuItem onClick={openAddLinkDialog}>{'Добавить '}</MenuItem>
          </MenuList>
        </Menu>
      )}
      <Dialog open={dialogOpen}>
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid item>
              {/**
               * link name
               */}
              <TextField
                value={linkName}
                onChange={(event) => {
                  const value = event.target.value as string;
                  setLinkName(value);
                }}
              />
              {/**
               * link url
               */}
              <TextField
                value={linkUrl}
                onChange={(event) => {
                  const value = event.target.value as string;
                  setLinkUrl(value);
                }}
              />
            </Grid>
            <Grid item></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container xs>
            <Grid item>
              <Button onClick={handleClick_addLink}>Добавить</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
