import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { IsValidMoment } from '../hooks/Validation/IsValidMoment';
import { IsNotEmpty, IsString } from 'class-validator';
import { DateType } from '../hooks/Validation/DateType';
import { TransformDate } from '../hooks/Validation/TransformDate';
import { Model } from '@sql-tools/sequelize-typescript';
import { CreateLiteralAssociation } from '@sql-tools/association-literal';
import { InferAttributes, InferCreationAttributes } from '@sql-tools/sequelize';
import { CreationAttributes } from '@sql-tools/sequelize';
/**
 * @TODO Надо переместить заполнение в вкладку "подачи", другие поля
 */
export class SendDoc extends Model<
  InferAttributes<SendDoc>,
  InferCreationAttributes<SendDoc>,
  CreateLiteralAssociation<SendDoc>
> {
  DataSend: moment.Moment;
  WhereSend: string;
}
export class SendDocInstance {
  @IsValidMoment()
  @IsNotEmpty()
  @DateType(false)
  @TransformDate(false)
  DateSend: moment.Moment;

  @IsNotEmpty()
  @IsString()
  WhereSend: string;
}
export type SendData = CreationAttributes<SendDoc>;

const initialState = {} as SendDocInstance;

const SendSlice = createSlice({
  name: 'Send',
  initialState,
  reducers: {
    setSendDoc(_, action: PayloadAction<SendDocInstance>) {
      return action.payload;
    },
    setSendDocProperty<T extends keyof SendDocInstance>(
      state: Draft<SendDocInstance>,
      action: PayloadAction<[T, SendDocInstance[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetSend() {
      return initialState;
    },
  },
});
export const { setSendDoc, setSendDocProperty, resetSend } = SendSlice.actions;
export default SendSlice.reducer;
