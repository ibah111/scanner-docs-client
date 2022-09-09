import { GridColumns } from '@mui/x-data-grid-premium';
import moment from 'moment';
import { Doc } from '../../Schemas/Doc.model';
import { generateName } from '../../utils/generateName';
import OpenDocuments from './OpenDocuments';

const columns: GridColumns<Doc> = [
  {
    field: 'Doc.id',
    headerName: '№',
    valueGetter: (params) => {
      return params.row.id;
    },
    width: 5,
  },
  {
    field: 'Barcode.code',
    headerName: 'Номер штрихкода',
    valueGetter(params) {
      return params.row.Barcode.code;
    },
    width: 130,
  },
  {
    field: 'contact_doc_id',
    headerName: 'Номер документа',
    valueGetter: (params) => {
      return params.row?.contact_doc_id;
    },
    width: 120,
  },
  {
    field: 'Doc.title',
    headerName: 'Название документа',
    valueGetter: (params) => {
      return params.row?.title;
    },
    width: 350,
    type: 'string',
  },

  {
    field: 'actions',
    type: 'actions',
    headerName: 'Документ',
    getActions: (params) => [
      <OpenDocuments
        key={1}
        id={Number(params.row.contact_doc_id)}
        title={params.row.title}
      />,
    ],
    width: 50,
  },
  {
    field: 'DocData.User.f',
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
    field: 'DocData.Depart.title',
    headerName: 'Подразделение',
    valueGetter: (params) => {
      return params.row.DocData.Depart.title;
    },
    width: 200,
  },
  {
    field: 'DocData.Transmits.date_send',
    headerName: 'Дата отправки в банк/ОСП',
    valueGetter: (params) => {
      if (params.row.DocData.Transmits.length > 0) {
        return moment(params.row.DocData.Transmits[0]?.date_send)
          .utc()
          .toDate();
      }
    },
    type: 'date',
    width: 200,
  },
  {
    field: 'DocData.Transmits.where_send',
    headerName: 'Куда отправлено',
    valueGetter: (params) => {
      if (params.row.DocData.Transmits.length > 0) {
        return params.row.DocData?.Transmits[0]?.where_send;
      }
    },
    width: 200,
  },
];

export default columns;
