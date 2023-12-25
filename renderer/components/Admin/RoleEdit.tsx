import {
  Box,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import React from 'react';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import RoleAdd from './RoleAdd';
import { Role, User } from '../../api/Roles/getRoles';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import removeRole from '../../api/removeRole';
import { resetUser } from '../../Reducer/User';

interface RightEditProps {
  data: User;
  roles: Role[];
  refresh: () => void;
}
export default function RoleEdit(props: RightEditProps) {
  const User = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const { data, refresh } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  return (
    <>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box>
          <IconButton onClick={handleClick}>
            <EditIcon />
          </IconButton>
          <Popper open={open} anchorEl={anchorEl}>
            <Paper>
              <Box>
                <RoleAdd {...props} />
              </Box>

              {data.Roles.map((i) => (
                <Box key={i.id}>
                  <Typography component={'span'} sx={{ p: 1 }}>
                    {i.title}
                    <IconButton
                      onClick={(event) => {
                        removeRole(i.id).then(() => {
                          if (User.login === data.login) {
                            dispatch(resetUser());
                          }
                          refresh();
                          handleClick(event);
                        });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>
    </>
  );
}
