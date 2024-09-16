import {
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';
import React from 'react';
import { Check } from '@mui/icons-material';

export default function AddInterests() {
  const { t } = useTranslation();
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
  const interests = getData('add_interests', 'boolean');
  const list_egrul = getData('list_egrul', 'boolean');
  const rename_notification = getData('rename_notification', 'boolean');

  const CheckedElement = () => (
    <ListItemIcon>
      <Check />
    </ListItemIcon>
  );

  return (
    <Grid item>
      <Button size="small" onClick={handleClick}>
        Значения
      </Button>
      {
        <Menu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          id="variable-menu"
        >
          <MenuList dense>
            <MenuItem>
              <ListItemText
                onClick={() =>
                  interests.setValue(interests.value === false ? true : false)
                }
              >
                {interests.value && <CheckedElement />}
                {t('form.send.add_interests')}
              </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText
                onClick={() =>
                  list_egrul.setValue(list_egrul.value === false ? true : false)
                }
              >
                {list_egrul.value && <CheckedElement />}
                Лист ЕГРЮЛ
              </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText
                onClick={() =>
                  rename_notification.setValue(
                    rename_notification.value === false ? true : false,
                  )
                }
              >
                {rename_notification.value && <CheckedElement />}
                Уведомление об переименовании
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      }
    </Grid>
  );
}
