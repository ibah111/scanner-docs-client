import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Grid, IconButton } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import createIp from '../../../../../../../apiSend/createIp';
import saveId from '../../../../../../../apiSend/saveId';
import { useAppDispatch } from '../../../../../../../Reducer';
import { reset } from '../../../../../../../Reducer/Send';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

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
  const dispatch = useAppDispatch();

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
        <SaveAsIcon color={!disabled ? 'inherit' : 'info'} />
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
         * сохранить
         */}
        <MenuItem
          onClick={() =>
            saveId().subscribe(() => {
              dispatch(reset());
            })
          }
        >
          <SaveOutlinedIcon fontSize="small" /> {'Сохранить ИД'}
        </MenuItem>
        {/**
         * создать ип
         */}
        <MenuItem
          onClick={() =>
            createIp().subscribe(() => {
              dispatch(reset());
            })
          }
        >
          <EditOutlinedIcon fontSize="small" />
          {'Создать ИД'}
        </MenuItem>
      </Menu>
    </Grid>
  );
}
