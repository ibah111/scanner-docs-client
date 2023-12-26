import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import getUser from '../../../api/Roles/getUser';
import { Role } from '../../../api/Roles/getRoles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import addRole from '../../../api/Roles/addRole';
import { enqueueSnackbar } from 'notistack';
import removeRole from '../../../api/Roles/removeRole';
interface AddRoleDiloagProps {
  open: boolean;
  onClose: VoidFunction;
  userId: number;
}
export default function AddRoleDialog({
  onClose,
  open,
  userId,
}: AddRoleDiloagProps) {
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [notInRoles, setNotInRoles] = React.useState<Role[]>([]);
  const refresh = () =>
    getUser(userId).then((res) => {
      setRoles(res.user.Roles);
      setNotInRoles(res.notInRoles);
    });

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
      <DialogTitle>Добавить роль</DialogTitle>
      <DialogContent>
        <Divider />
        <br />
        <Grid container xs spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="current-roles-select-label">
                Текущие роли
              </InputLabel>
              <Select
                labelId="current-roles-select-label"
                id="current-roles-select-label"
                label="Текущие роли"
              >
                {roles.map((i) => (
                  <>
                    <MenuItem value={i.id} key={i.id}>
                      {i.title}
                      <IconButton
                        onClick={() =>
                          removeRole(userId, i.id).then(() =>
                            refresh().then(() =>
                              enqueueSnackbar('Роль удалена', {
                                variant: 'warning',
                              }),
                            ),
                          )
                        }
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </MenuItem>
                  </>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="allowed-roles-select-label">
                Роли которые можно присвоить
              </InputLabel>
              <Select
                labelId="allowed-roles-select-label"
                id="allowed-roles-select-label"
                label="Роли которые можно присвоить"
              >
                {notInRoles.map((i) => (
                  <>
                    <MenuItem value={i.id} key={i.id}>
                      {i.title}
                      <IconButton
                        onClick={() =>
                          addRole(userId, i.id).then(() =>
                            refresh().then(() =>
                              enqueueSnackbar('Роль добавлена', {
                                variant: 'success',
                              }),
                            ),
                          )
                        }
                        size="small"
                      >
                        <AddIcon />
                      </IconButton>
                    </MenuItem>
                  </>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
