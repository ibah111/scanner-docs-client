import { GridColumns } from "@mui/x-data-grid-premium";
import { User_Role } from "../../Schemas/UserRole.model";
import { generateName } from "../../utils/generateName";

const columns: GridColumns<User_Role> = [
  {
    field: "id",
    headerName: "№",
    width: 5,
  },
  {
    field: "user_id",
    headerName: "Id пользователя",
    valueGetter: (params) => {
      return params.row.user_id;
    },
  },
  {
    field: "user",
    headerName: "Пользователь",
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
    field: "role",
    headerName: "Доступная роль",
    valueGetter: (params) => {
      return params.row.Role?.title;
    },
    width: 200,
  },
];
export default columns;
