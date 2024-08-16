import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface ValidController {
  fssp_date_required_controller: boolean;
}

const initialState: ValidController = {
  fssp_date_required_controller: true,
};

const ValidControllerSlice = createSlice({
  name: 'ValidController',
  initialState,
  reducers: {
    setValidController<T extends keyof ValidController>(
      state: Draft<ValidController>,
      action: PayloadAction<[T, ValidController[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetValidController() {
      return initialState;
    },
  },
});
export const { setValidController, resetValidController } =
  ValidControllerSlice.actions;
export default ValidControllerSlice.reducer;
