import { DocAttach, User } from '@contact/models';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid-premium';
import { t } from 'i18next';
import { generateName } from '../../../../../../../utils/generateName';
import Actions from './Actions';
import moment from 'moment';

export function getLawExecColumns(refresh: () => void) {
  const columns: GridColDef<DocAttach>[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: t('form.documents.table.name'),
    },
    {
      field: 'dt',
      headerName: t('form.documents.table.dt'),
      type: 'date',
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: 'User',
      headerName: t('form.documents.table.user'),
      valueGetter: (params: GridValueGetterParams<DocAttach, User>) =>
        generateName(params.value?.f, params.value?.i, params.value?.o),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('form.documents.table.actions.name'),
      getActions: (params) => [
        <Actions key={1} id={params.row.id} refresh={refresh} />,
      ],
    },
  ];
  return columns;
}

export function getLawActColumns(refresh: () => void) {
  const columns: GridColDef<DocAttach>[] = [
    {
      field: 'id',
      headerName: 'ID судебной работы',
    },
    {
      field: 'name',
      headerName: 'Наименование вложения',
      type: 'string',
    },
    {
      field: 'dt',
      type: 'date',
      headerName: 'Дата документа',
      valueGetter(params) {
        return moment(params.row.dt).toDate();
      },
    },
    {
      field: 'User',
      headerName: t('form.documents.table.user'),
      valueGetter: (params: GridValueGetterParams<DocAttach, User>) =>
        generateName(params.value?.f, params.value?.i, params.value?.o),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('form.documents.table.actions.name'),
      getActions: (params) => [
        <Actions key={1} id={params.row.id} refresh={refresh} />,
      ],
    },
  ];
  return columns.map<GridColDef<DocAttach>>((items) => ({
    width: 100,
    align: 'center',
    headerAlign: 'center',
    ...items,
  }));
}
