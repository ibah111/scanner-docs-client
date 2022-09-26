import { Box, Grid, IconButton } from '@mui/material';
import { DataGridPremium, GridColumns } from '@mui/x-data-grid-premium';
import { Delete as DeleteIcon } from '@mui/icons-material';
import React from 'react';
import UserAdd from './UserAdd';
import RoleEdit from './RoleEdit';
import getRoles, { ResultRole, User } from '../../api/getRoles';
import removeUser from '../../api/removeUser';

export default function Role() {
  const [rights, setRights] = React.useState<ResultRole>({
    roles: [],
    users: [],
  });
  const refresh = () => {
    getRoles().then((res) => {
      setRights(res);
    });
  };
  const columns: GridColumns<User> = [
    { field: 'id' },
    { field: 'login', headerName: 'Логин', width: 250 },
    {
      field: 'roles',
      headerName: 'Роли',
      width: 250,
      valueGetter(params) {
        return params.row.Users_Roles.map((value) => value.Role.title).join(
          ', ',
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Действия',
      type: 'actions',
      getActions(params) {
        return [
          <RoleEdit
            key={0}
            data={params.row}
            roles={rights.roles}
            refresh={refresh}
          />,
          <IconButton
            key={1}
            onClick={() => {
              removeUser(params.row.id).then(() => {
                refresh();
              });
            }}
          >
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];
  React.useEffect(() => {
    refresh();
  }, []);
  return (
    <>
      <Box p={1} display="flex" alignItems="flex-end">
        <UserAdd refresh={refresh} />
      </Box>
      <Grid item xs sx={{ flexGrow: 1, width: '100vw', height: '100%' }}>
        <DataGridPremium
          sx={{ pl: 3, pr: 3, pt: 2 }}
          columns={columns}
          rows={rights.users}
        />
      </Grid>
    </>
  );
}
