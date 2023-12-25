import { Box, Button, ClickAwayListener, Paper, Popper } from '@mui/material';
import React from 'react';
import addRole from '../../api/Roles/addRole';
import { Role, User } from '../../api/Roles/getRoles';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import { resetUser } from '../../Reducer/User';

interface RightEditProps {
  data: User;
  roles: Role[];
  refresh: () => void;
}
export default function RoleAdd({ data, roles, refresh }: RightEditProps) {
  const User = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
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
          {!(data.Roles.length === roles.length) ? (
            <Button onClick={handleClick}>Добавить роль</Button>
          ) : null}
          <Popper open={open} anchorEl={anchorEl}>
            <Paper>
              {roles.map((value) =>
                !data.Roles.map((value) => value.name).includes(value.name) ? (
                  <Button
                    key={value.id}
                    onClick={(event) => {
                      addRole(data.id, value.id).then(() => {
                        if (data.login === User.login) {
                          dispatch(resetUser());
                        }
                        refresh();
                        handleClick(event);
                      });
                    }}
                  >
                    {value.title}
                  </Button>
                ) : null,
              )}
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>
    </>
  );
}
