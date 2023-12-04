import { GridColDef } from '@mui/x-data-grid-premium';
import { User } from '../../api/getRoles';
import React from 'react';
import { Type } from '../../api/TypesApi/ClassType';

export default function useColumns(roles: Type[]) {
  const selects = [
    {
      label: 'Нет',
      value: 0,
    },
    ...roles.map((i) => ({
      label: i.title,
      value: i.id,
    })),
  ];
  return React.useMemo<GridColDef<User>[]>(
    () => [
      { field: 'id', type: 'number' },
      { field: 'login', headerName: 'Логин', width: 250, type: 'string' },
      {
        field: 'roles',
        headerName: 'Роли',
        width: 250,
        type: 'singleSelect',
        valueOptions: selects,
        valueGetter(params) {
          const roles = params.row.Roles?.map((value) => value.title);
          if (roles.length === 0) return 'Ролей нет';
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
