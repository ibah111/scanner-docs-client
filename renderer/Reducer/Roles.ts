import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User_Role } from "../Schemas/UserRole.model";

const initialState: User_Role[] = [];
const RoleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles(state, action: PayloadAction<User_Role[]>) {
      return action.payload;
    },
    resetRoles() {
      return null;
    },
  },
});
export const { setRoles, resetRoles } = RoleSlice.actions;
export default RoleSlice.reducer;
