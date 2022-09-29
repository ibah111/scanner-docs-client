import { Grid } from '@mui/material';
import {
  DataGridPremium,
  GridColumns,
  GridToolbar,
} from '@mui/x-data-grid-premium';
import React from 'react';
import getRoles, { ResultRole, User } from '../api/getRoles';
import RoleEdit from '../components/Admin/RoleEdit';

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
        ];
      },
    },
  ];
  React.useEffect(() => {
    refresh();
  }, []);
  return (
    <>
      <Grid item xs sx={{ width: '100vw', height: '100%' }}>
        <DataGridPremium
          sx={{ pl: 2 }}
          columns={columns}
          rows={rights.users}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Grid>
    </>
  );
}
