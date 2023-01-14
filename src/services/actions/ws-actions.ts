import { createAction } from "@reduxjs/toolkit";
import { TWsData } from "../../utils/types";

export const connect = createAction<string, 'WS_CONNECT'>('WS_CONNECT');

export const wsConnecting = createAction('WS_CONNECTING');

export const disconnect = createAction('WS_DISCONNECT');

export const wsOpen = createAction('WS_OPEN');

export const wsClose = createAction('WS_CLOSE');

export const wsError = createAction<string, 'WS_ERROR'>('WS_ERROR');

export const wsMessage = createAction<TWsData, 'WS_MESSAGE'>('WS_MESSAGE');

export type TWsActions = 
  | ReturnType<typeof connect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsMessage>
;
