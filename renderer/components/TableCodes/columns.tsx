import { GridColumns } from '@mui/x-data-grid-premium';
import { Doc } from '../../Schemas/Doc.model';
import OpenDoc from '../MainPage/openDoc';

const columns: GridColumns<Doc> = [
  {
    field: 'id',
    headerName: '№',
    width: 5,
  },
  {
    field: 'actions',
    headerName: 'Документ',
    type: 'actions',
    getActions: () => {
      return [<OpenDoc key={0} />];
    },
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
    field: 'title',
    headerName: 'Название',
    valueGetter: (params) => {
      return params.row.title;
    },
    width: 200,
  },
  {
    field: 'law_act_id',
    headerName: 'LAW_ACT_ID',
    valueGetter(params) {
      return params.row.law_act_id;
    },
    width: 150,
  },
  {
    field: 'law_exec_id',
    headerName: 'LAW_EXEC_ID',
    valueGetter: (params) => {
      return params.row.law_exec_id;
    },
    width: 200,
  },
];

export default columns;
