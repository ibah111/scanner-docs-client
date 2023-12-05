import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { IsValidMoment } from '../hooks/Validation/IsValidMoment';
import { IsNotEmpty, IsString } from 'class-validator';
import { DateType } from '../hooks/Validation/DateType';
import { TransformDate } from '../hooks/Validation/TransformDate';
import { Model } from '@sql-tools/sequelize-typescript';
import { CreateLiteralAssociation } from '@sql-tools/association-literal';
import { InferAttributes, InferCreationAttributes } from '@sql-tools/sequelize';
import { CreationAttributes } from '@sql-tools/sequelize';

export class Send extends Model<
  InferAttributes<Send>,
  InferCreationAttributes<Send>,
  CreateLiteralAssociation<Send>
> {
  DataSend: moment.Moment;
  WhereSend: string;
}
export class SendInstance {
  @IsValidMoment()
  @IsNotEmpty()
  @DateType(false)
  @TransformDate(false)
  DateSend: moment.Moment;

  @IsNotEmpty()
  @IsString()
  WhereSend: string;
}
export type SendData = CreationAttributes<Send>;

const initialState = {} as SendInstance;

const SendSlice = createSlice({
  name: 'Send',
  initialState,
  reducers: {
    setSend(_, action: PayloadAction<SendInstance>) {
      return action.payload;
    },
    setSendProperty<T extends keyof SendInstance>(
      state: Draft<SendInstance>,
      action: PayloadAction<[T, SendInstance[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetSend() {
      return initialState;
    },
  },
});
export const { setSend, resetSend } = SendSlice.actions;
export default SendSlice.reducer;
