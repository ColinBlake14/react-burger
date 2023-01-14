import { createReducer } from "@reduxjs/toolkit";
import { TWsData, WsStatus } from "../../utils/types"
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/ws-profile-actions";

export type TWsState = {
  status: WsStatus,
  data: TWsData | null,
  connectingError: string
};

const initialState: TWsState = {
  status: WsStatus.OFFLINE,
  data: null,
  connectingError: ''
};

export const wsProfileReducer = createReducer(initialState, builder => {
  builder
    .addCase(wsConnecting, state => {
      state.status = WsStatus.CONNECTING;
    })
    .addCase(wsOpen, state => {
      state.status = WsStatus.ONLINE;
      state.connectingError = '';
    })
    .addCase(wsClose, state => {
      state.status = WsStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.data = action.payload;
    })
})
