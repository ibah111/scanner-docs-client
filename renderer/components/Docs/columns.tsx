import { GridColumns } from "@mui/x-data-grid-premium";
import { Doc } from "../../Schemas/Doc.model";
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
    field: "title",
    headerName: "Название документа",
    valueGetter: (params) => {
      return params.row?.title;
    },
    width: 350,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Документ",
    getActions: (params) => [
      <OpenDocuments
        id={Number(params.row.contact_doc_id)}
        title={params.row?.title}
      />,
    ],
    width: 50,
  },
];

export default columns;
