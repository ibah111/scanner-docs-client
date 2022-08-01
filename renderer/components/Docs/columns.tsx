import { GridColumns } from "@mui/x-data-grid-premium";
import { Doc } from "../../Schemas/Doc.model";
import { generateName } from "../../utils/generateName";

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
  },
  {
    field: "doc_name",
    headerName: "Название документа",
    valueGetter: (params) => {
      return params.row?.title;
    },
  },
  {
    field: "actions",
    headerName: "Документ",
    type: "actions",
    getActions: (params) => {
      return [];
    },
  },
];

export default columns;
