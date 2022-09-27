import { GridColumns } from '@mui/x-data-grid-premium';
import moment from 'moment';
import { Doc } from '../../Schemas/Doc.model';
import { generateName } from '../../utils/generateName';
import OpenDocuments from '../Docs/OpenDocuments';

const columns: GridColumns<Doc> = [
  {
    field: 'id',
    headerName: '№',
    width: 5,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Документ',
    getActions: (params) => {
      return [
        <OpenDocuments
          key={1}
          id={Number(params.row.contact_doc_id)}
          title={params.row.title}
        />,
      ];
    },

    width: 50,
  },
  {
    field: 'date_post',
    headerName: 'Дата поступления',
    valueGetter: (params) => {
      return moment(params.row.doc?.date_post).toDate();
    },
    type: 'date',
    width: 200,
  },
  {
    field: 'st_pnkt',
    headerName: 'Статья и пункт',
    valueGetter: (params) => {
      return params.row.DocData.Result?.st_pnkt;
    },
    width: 130,
  },
  {
    field: 'kd',
    headerName: 'КД',
    valueGetter: (params) => {
      return params.row.DocData.Result.kd;
    },
    width: 200,
  },
  {
    field: 'reestr',
    headerName: 'Реестр',
    valueGetter: (params) => {
      return params.row.DocData.Result.reestr;
    },
    width: 200,
  },
  {
    field: 'fio_dol',
    headerName: 'ФИО должника',
    valueGetter: (params) => {
      return params.row.DocData.Result.fio_dol;
    },
    width: 200,
  },
  {
    field: 'fio',
    headerName: 'Текущий держатель',
    valueGetter: (params) => {
      return generateName(
        params.row.DocData.User.f,
        params.row.DocData.User.i,
        params.row.DocData.User.o,
      );
    },
    width: 200,
  },
  {
    field: 'depart',
    headerName: 'Подразделение',
    valueGetter: (params) => {
      return params.row.DocData.Depart.title;
    },
    width: 200,
  },

  {
    field: 'fio_old',
    headerName: 'Предыдущий держатель',
    valueGetter: (params) => {
      return generateName(
        params.row.DocData.UserOld?.f,
        params.row.DocData.UserOld?.i,
        params.row.DocData.UserOld?.o,
      );
    },
    width: 200,
  },
  {
    field: 'depart_old',
    headerName: 'Предыдущее подразделение',
    valueGetter: (params) => {
      return params.row.DocData.DepartOld?.title;
    },
    width: 200,
  },
];

export default columns;
