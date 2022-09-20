import { GridColumns } from '@mui/x-data-grid-premium';
import moment from 'moment';
import { Barcode } from '../../Schemas/Barcode.model';
import { generateName } from '../../utils/generateName';
import OpenDocuments from '../Docs/OpenDocuments';

const columnsBarcode: GridColumns<Barcode> = [
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
          id={Number(params.row.Doc.contact_doc_id)}
          title={params.row.Doc.title}
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
      return params.row.doc?.st_pnkt;
    },
    width: 130,
  },
  {
    field: 'kd',
    headerName: 'КД',
    valueGetter: (params) => {
      return params.row.doc?.kd;
    },
    width: 200,
  },
  {
    field: 'reestr',
    headerName: 'Реестр',
    valueGetter: (params) => {
      return params.row.doc?.reestr;
    },
    width: 200,
  },
  {
    field: 'fio_dol',
    headerName: 'ФИО должника',
    valueGetter: (params) => {
      return params.row.doc?.fio_dol;
    },
    width: 200,
  },
  {
    field: 'fio',
    headerName: 'Текущий держатель',
    valueGetter: (params) => {
      if (params.row.Doc) {
        return generateName(
          params.row.Doc.DocData.User.f,
          params.row.Doc.DocData.User.i,
          params.row.Doc.DocData.User.o,
        );
      } else {
        return generateName(
          params.row.DocData.User.f,
          params.row.DocData.User.i,
          params.row.DocData.User.o,
        );
      }
    },
    width: 200,
  },
  {
    field: 'depart',
    headerName: 'Подразделение',
    valueGetter: (params) => {
      if (params.row.Doc) {
        return params.row.Doc?.DocData.Depart.title;
      } else {
        return params.row.DocData.Depart.title;
      }
    },
    width: 200,
  },

  {
    field: 'fio_old',
    headerName: 'Предыдущий держатель',
    valueGetter: (params) => {
      return generateName(
        params.row.UserOld?.f,
        params.row.UserOld?.i,
        params.row.UserOld?.o,
      );
    },
    width: 200,
  },
  {
    field: 'depart_old',
    headerName: 'Предыдущее подразделение',
    valueGetter: (params) => {
      return params.row.DepartOld?.title;
    },
    width: 200,
  },
];

export default columnsBarcode;
