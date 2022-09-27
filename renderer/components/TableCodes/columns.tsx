import { GridColumns } from '@mui/x-data-grid-premium';
import { Doc } from '../../Schemas/Doc.model';
import OpenDocuments from '../Docs/OpenDocuments';

const columns: GridColumns<Doc> = [
  {
    field: 'Doc.id',
    headerName: '№',
    valueGetter: (params) => {
      return params.row.id;
    },
    width: 25,
  },
  {
    field: 'Barcode.code',
    headerName: 'Номер штрихкода',
    valueGetter(params) {
      return params.row.Barcode?.code;
    },
    width: 130,
  },
  {
    field: 'contact_doc_id',
    headerName: 'Номер документа',
    valueGetter(params) {
      return params.row.contact_doc_id;
    },
    width: 150,
  },
  {
    field: 'DocData.Result.kd',
    headerName: 'Кредитный договор',
    valueGetter: (params) => {
      return params.row?.DocData.Result.kd;
    },
    width: 200,
  },
  {
    field: 'DocData.Result.reestr',
    headerName: 'Реестр',
    valueGetter: (params) => {
      return params.row.DocData.Result.reestr;
    },
    width: 200,
  },
  {
    field: 'DocData.Result.fio_dol',
    headerName: 'ФИО должника',
    valueGetter: (params) => {
      return params.row.DocData.Result.fio_dol;
    },
    width: 200,
  },
  {
    field: 'Doc.title',
    headerName: 'Название документа',
    valueGetter: (params) => {
      return params.row.title;
    },
    width: 200,
  },
  {
    field: 'actions',
    headerName: 'Документ',
    type: 'actions',
    getActions: (params) => {
      return [
        <OpenDocuments
          key={1}
          id={Number(params.row.contact_doc_id)}
          title={params.row.title}
        />,
      ];
    },
  },

  {
    field: 'law_act_id',
    headerName: 'Юридическое дело',
    valueGetter(params) {
      return params.row.law_act_id;
    },
    width: 150,
  },
  {
    field: 'law_exec_id',
    headerName: 'Исполнительное дело',
    valueGetter: (params) => {
      return params.row.law_exec_id;
    },
    width: 200,
  },
];

export default columns;
