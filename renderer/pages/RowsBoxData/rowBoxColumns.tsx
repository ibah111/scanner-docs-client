import { GridColDef } from '@mui/x-data-grid-premium';
import { Doc } from '../../Schemas/Doc.model';
import OpenDocuments from '../../components/Docs/OpenDocuments';

export default function rowBoxColumns() {
  const cols: GridColDef<Doc>[] = [
    {
      width: 75,
      type: 'number',
      field: 'id',
      headerName: '№',
      valueGetter: (params) => {
        return params.row.id;
      },
    },
    {
      width: 150,
      type: 'string',
      field: 'code',
      headerName: 'Номер штрихкода',
      valueGetter(params) {
        return params.row.Barcode?.code;
      },
    },
    {
      width: 150,
      type: 'number',
      field: 'contact_doc_id',
      headerName: 'Номер документа',
      valueGetter(params) {
        return params.row.contact_doc_id;
      },
    },
    {
      type: 'string',
      field: 'kd',
      headerName: 'Кредитный договор',
      valueGetter: (params) => {
        return params.row?.DocData.Result.kd;
      },
      width: 200,
    },
    {
      type: 'string',
      field: 'reestr',
      headerName: 'Реестр',
      valueGetter: (params) => {
        return params.row.DocData.Result.reestr;
      },
      width: 200,
    },
    {
      type: 'string',
      field: 'fio_dol',
      headerName: 'ФИО должника',
      valueGetter: (params) => {
        return params.row.DocData.Result.fio_dol;
      },
      width: 200,
    },
    {
      type: 'string',
      field: 'title',
      headerName: 'Название документа',
      valueGetter: (params) => {
        return params.row.title;
      },
      width: 200,
    },
    {
      type: 'actions',
      field: 'actions',
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
    },
    {
      type: 'number',
      field: 'law_act_id',
      headerName: 'Юридическое дело',
      description: 'Приказ, иск, правопреемство, банкротство',
      valueGetter(params) {
        return params.row.law_act_id;
      },
      width: 150,
    },
    {
      type: 'number',
      field: 'law_exec_id',
      headerName: 'Исполнительное производство',
      valueGetter: (params) => {
        return params.row.law_exec_id;
      },
      width: 200,
    },
  ];
  return cols;
}
