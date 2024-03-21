import { configureStore } from '@reduxjs/toolkit';
import {
  ReactReduxContextValue,
  TypedUseSelectorHook,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux';
import Box from './Box';
import Data from './Data';
import Docs from './Docs';
import DocsComponent from './DocsComponent';
import Message from './Message';
import RowDoc from './RowDoc';
import RowsBox from './RowsBox';
import SendDoc from './SendDoc';
import State from './State';
import User from './User';
import Doc from './Doc';
import Send from './Send';
import App from './App';
import StateResult from './StateResult';
import Search from './Search';
import Comment from './Comment';
import Dict from './Dict';
import Error from './Error';
import LawExec from './LawExec';
import Results from './Results';
import React from 'react';

export const store = configureStore({
  reducer: {
    User,
    SendDoc,
    Data,
    Message,
    State,
    Docs,
    DocsComponent,
    RowsBox,
    Box,
    RowDoc,
    Doc,
    //Send
    App,
    Search,
    Send,
    StateResult,
    Comment,
    Dict,
    Error,
    LawExec,
    Results,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const RootReducerContext = React.createContext(
  null as unknown as ReactReduxContextValue,
);
export const useAppDispatch: () => AppDispatch =
  createDispatchHook(RootReducerContext);
export const useAppSelector: TypedUseSelectorHook<RootState> =
  createSelectorHook(RootReducerContext);
