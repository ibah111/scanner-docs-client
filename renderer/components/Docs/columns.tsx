import { GridColumns } from '@mui/x-data-grid-premium';
import moment from 'moment';
import { Doc } from '../../Schemas/Doc.model';
import { generateName } from '../../utils/generateName';
import OpenDocuments from './OpenDocuments';

const columns: GridColumns<Doc> = [
  {
    field: 'id',
    headerName: '№',
    width: 5,
  },
  {
    field: 'contact_doc_id',
    headerName: 'Номер документа',
    valueGetter: (params) => {
      return params.row?.contact_doc_id;
    },
    width: 150,
  },
  {
    field: 'Doc.title',
    headerName: 'Название документа',
    valueGetter: (params) => {
      return params.row?.title;
    },
    width: 350,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Документ',
    getActions: (params) => [
      <OpenDocuments
        key={1}
        id={Number(params.row.contact_doc_id)}
        title={params.row?.title}
      />,
    ],
    width: 50,
  },
  {
    field: 'Barcode.User.f',
    headerName: 'Текущий держатель',
    valueGetter: (params) => {
      return generateName(
        params.row.Barcode.User.f,
        params.row.Barcode.User.i,
        params.row.Barcode.User.o,
      );
    },
    width: 200,
  },
  {
    field: 'Barcode.Depart.title',
    headerName: 'Подразделение',
    valueGetter: (params) => {
      return params.row.Barcode.Depart.title;
    },
    width: 200,
  },
  {
    field: 'date_send',
    headerName: 'Дата отправки в банк/ОСП',
    valueGetter: (params) => {
      if (params.row.Barcode.Transmits.length > 0) {
        return moment(params.row.Barcode.Transmits[0].date_send).utc().toDate();
      }
    },
    type: 'date',
    width: 200,
  },
  {
    field: 'where_send',
    headerName: 'Куда отправлено',
    valueGetter: (params) => {
      if (params.row.Barcode.Transmits.length > 0) {
        return params.row.Barcode.Transmits[0].where_send;
      }
    },
    width: 200,
  },
];

export default columns;
