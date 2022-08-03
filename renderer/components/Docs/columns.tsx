import { GridColumns } from "@mui/x-data-grid-premium";
import { Doc } from "../../Schemas/Doc.model";
import { generateName } from "../../utils/generateName";
import OpenDocuments from "./OpenDocuments";

const columns: GridColumns<Doc> = [
  {
    field: "id",
    headerName: "№",
    width: 5,
  },
  {
    field: "contact_doc_id",
    headerName: "Номер документа",
    valueGetter: (params) => {
      return params.row?.contact_doc_id;
    },
    width: 150,
  },
  {
    field: "doc_name",
    headerName: "Название документа",
    valueGetter: (params) => {
      return params.row?.title;
    },
    width: 350,
  },
  {
    field: "actions",
    type: "actions",
    getActions: (params) => [
      <OpenDocuments
        id={Number(params.row.contact_doc_id)}
        title={params.row?.title}
      />,
    ],
    width: 50,
  },
  {
    field: "fio",
    headerName: "Текущий держатель",
    valueGetter: (params) => {
      return generateName(
        params.row.User?.f,
        params.row.User?.i,
        params.row.User?.o
      );
    },
    width: 200,
  },
  {
    field: "depart",
    headerName: "Подразделение",
    valueGetter: (params) => {
      return params.row.Depart?.title;
    },
    width: 200,
  },
  {
    field: "where_send",
    headerName: "Дата отправки в банк/ОСП",
    valueGetter: (params) => {
      if (params.row.Transmits?.length > 0) {
        params.row.Transmits[0]?.date_send;
      }
    },
    type: "dateTime",
    width: 200,
  },
  {
    field: "whereSend",
    headerName: "Куда отправлено",
    valueGetter: (params) => {
      if (params.row.Transmits?.length > 0) {
        params.row.Transmits[0]?.where_send;
      }
    },
    width: 200,
  },
];

export default columns;
