import { GridColDef } from '@mui/x-data-grid-premium';
import { User } from '../../api/getRoles';
import React from 'react';

export default function useColumns() {
  return React.useMemo<GridColDef<User>[]>(
    () => [
      { field: 'id' },
      { field: 'login', headerName: 'Логин', width: 250 },
      {
        field: 'roles',
        headerName: 'Роли',
        width: 250,
        valueGetter(params) {
          const roles = params.row.Roles?.map((value) => value.title);
          if (roles.length === 0) return 'No roles';
          return roles.join(', ');
        },
      },
      {
        field: 'Actions',
        headerName: 'Действия',
        type: 'actions',
        getActions: () => [],
      },
    ],
    [],
  );
}
