import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Doc } from '../Schemas/Doc.model';
import { CreationAttributes } from '@sql-tools/sequelize';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type DocData = CreationAttributes<Doc>;

export class DocInstance implements DocData {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  contact_doc_id: number;

  @IsNumber()
  @IsNotEmpty()
  mail_id: number;

  @IsNumber()
  law_act_id: number;

  @IsNumber()
  law_exec_id: number;

  @IsNotEmpty()
  @IsNumber()
  doc_type: number;
}

const initialState = {} as DocInstance;
const DocSlice = createSlice({
  name: 'Doc',
  initialState,
  reducers: {
    setValue(_, action: PayloadAction<DocInstance>) {
      return action.payload;
    },
    setPropertyValue<T extends keyof DocInstance>(
      state: Draft<DocInstance>,
      action: PayloadAction<[T, DocInstance[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetData() {
      return initialState;
    },
  },
});
export const { setValue, setPropertyValue, resetData } = DocSlice.actions;
export default DocSlice.reducer;
