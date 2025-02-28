import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Icon,
  IconButton,
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
import ClearIcon from '@mui/icons-material/Clear';
import deleteLink from '../../../../../../apiSend/Links/deleteLink';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

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

  const isValidUrl = (url: string) => {
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/i;
    return pattern.test(url);
  };

  const valid_name = linkName.length > 5;
  const valid_url = isValidUrl(linkUrl);
  const disabled = valid_name === true && valid_url === true ? false : true;

  const close_reset = () => {
    setDialogOpen(false);
    setLinkName('');
    setLinkUrl('');
  };
  const handleClick_addLink = () => {
    addLink({
      item_name: linkName,
      item_url: linkUrl,
    }).subscribe((res) => {
      if (res) {
        enqueueSnackbar('Ссылка создана', {
          variant: 'success',
        });
        onClose();
        getData();
      }
    });
  };

  const [sureOpen, setSureOpen] = React.useState<boolean>(false);

  const [link, setLink] = React.useState<LinkType | object>({});
  const handleClick_deleteLink = React.useCallback((link: LinkType) => {
    setSureOpen(true);
    setLink(link);
  }, []);

  const onClose = React.useCallback(() => {
    setDialogOpen(false);
    close_reset();
  }, []);

  const getData = React.useCallback(() => {
    getLinks().subscribe((links) => setLinks(links));
  }, []);

  const onClose_deleteLink = React.useCallback(() => {
    setSureOpen(false);
    getData();
  }, [getData]);

  React.useEffect(() => {
    getData();
  }, [getData]);
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
              <>
                <Grid container>
                  <Grid item xs={10}>
                    <LinkMenuItem
                      key={id}
                      menuItemName={item_name}
                      url={item_url}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleClick_deleteLink({
                          id,
                          item_name,
                          item_url,
                        })
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </>
            ))}
            <MenuItem onClick={openAddLinkDialog}>
              <Grid container>
                <Grid item xs={1}>
                  <Icon fontSize="small">
                    <AddOutlinedIcon />
                  </Icon>
                </Grid>
                <Grid item xs={8}>
                  {' Добавить'}
                </Grid>
              </Grid>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={onClose} fullWidth maxWidth="md">
          <DialogTitle align="center">{`Добавление ссылки`}</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                {/**
                 * link name
                 */}
                <TextField
                  error={!valid_name}
                  helperText={
                    !valid_name
                      ? 'Название ссылки должно быть блинне 5 символов'
                      : 'Название валидно'
                  }
                  fullWidth
                  id="link_name"
                  label="Название ссылки"
                  value={linkName}
                  onChange={(event) => {
                    const value = event.target.value as string;
                    setLinkName(value);
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                {/**
                 * link url
                 */}
                <TextField
                  error={!valid_url}
                  helperText={
                    !valid_url ? 'Текст не является ссылкой' : 'Ссылка валидна'
                  }
                  fullWidth
                  id="link_url"
                  label="Ссылка"
                  value={linkUrl}
                  onChange={(event) => {
                    const value = event.target.value as string;
                    setLinkUrl(value);
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Grid container xs justifyContent={'flex-end'}>
              <Grid item>
                <Button
                  disabled={disabled}
                  onClick={handleClick_addLink}
                  variant="contained"
                  color="success"
                >
                  Добавить
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      )}
      {sureOpen && (
        <SureDialog open={sureOpen} onClose={onClose_deleteLink} link={link} />
      )}
    </Grid>
  );
}

interface SureDialogProps {
  open: boolean;
  onClose: VoidFunction;
  link: LinkType;
}

function SureDialog({ open, onClose, link }: SureDialogProps) {
  const sureDelete = () => {
    deleteLink(link).subscribe((res) => {
      if (res)
        enqueueSnackbar('Успешно', {
          variant: 'success',
        });
      onClose();
    });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{`Удаление ссылки: ID = ${link.id}`}</DialogTitle>
      <DialogContent>{`${link.item_name} ${link.item_url}`}</DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={() => sureDelete()}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
