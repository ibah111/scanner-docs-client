import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Data from "./Data";
import Docs from "./Docs";
import DocsComponent from "./DocsComponent";
import Message from "./Message";
import openTransmit from "./openTransmit";
import Send from "./Send";
import State from "./State";
import User from "./User";

export const store = configureStore({
  reducer: {
    User,
    Send,
    Data,
    Message,
    State,
    Docs,
    DocsComponent,
    openTransmit,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
