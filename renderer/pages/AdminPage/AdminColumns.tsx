import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid-premium';
import { User } from '../../api/Roles/getRoles';
import React from 'react';
import { Type } from '../../api/TypesApi/ClassType';
import AddIcon from '@mui/icons-material/Add';

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
      { field: 'id', type: 'number', headerName: 'ID' },
      { field: 'login', headerName: 'Логин', width: 250, type: 'string' },
      {
        field: 'FIO',
        headerName: 'ФИО',
        width: 300,
        valueGetter(params) {
          const f = params.row.f;
          const i = params.row.i;
          const o = params.row.o;
          return f + ' ' + i + ' ' + o;
        },
      },
      {
        field: 'roles',
        headerName: 'Роли',
        width: 250,
        valueOptions: selects,
        valueGetter(params) {
          const roles = params.row.Roles?.map((value) => value.title);
          if (roles?.length === 0) return 'Ролей нет';
          return roles?.join(', ');
        },
      },
      {
        field: 'Actions',
        headerName: 'Действия',
        type: 'actions',
        getActions: () => [
          <>
            <GridActionsCellItem
              label="addRole"
              onClick={() => {}}
              icon={<AddIcon />}
            />
          </>,
        ],
      },
    ],
    [],
  );
}
