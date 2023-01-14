import { createAction } from "@reduxjs/toolkit";
import { TWsData } from "../../utils/types";

export const connect = createAction<string, 'WS_PROFILE_CONNECT'>('WS_PROFILE_CONNECT');

export const wsConnecting = createAction('WS_PROFILE_CONNECTING');

export const disconnect = createAction('WS_PROFILE_DISCONNECT');

export const wsOpen = createAction('WS_PROFILE_OPEN');

export const wsClose = createAction('WS_PROFILE_CLOSE');

export const wsError = createAction<string, 'WS_PROFILE_ERROR'>('WS_PROFILE_ERROR');

export const wsMessage = createAction<TWsData, 'WS_PROFILE_MESSAGE'>('WS_PROFILE_MESSAGE');

export type TWsProfileActions = 
  | ReturnType<typeof connect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsMessage>
;
