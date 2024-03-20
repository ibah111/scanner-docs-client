import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { plainToInstance } from 'class-transformer';
import { AuthUser, AuthUserSuccess } from '../Schemas/Auth';

const initialState: AuthUser<boolean> = {
  output: 'Вы не вошли',
  id: 0,
  /**
   * @Problem
   * Ее источник
   */
  local_id: 0,
  login: '',
  login_result: false,
  birthdate: '',
  department: '',
  position: '',
  firstname: '',
  secondname: '',
  thirdname: '',
  roles: [],
  error: '',
  avatar: '',
};
export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, value: PayloadAction<AuthUserSuccess>) => {
      return plainToInstance(AuthUser<true>, value.payload);
    },
    resetUser() {
      return initialState;
    },
  },
});
export const { setUser, resetUser } = UserSlice.actions;
export default UserSlice.reducer;
