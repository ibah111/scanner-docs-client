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
    headerName: "Открыть документ",
    valueGetter: (params) => {
      return params.row?.title;
    },
    width: 350,
  },
];

export default columns;
