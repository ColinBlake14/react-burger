import React, { useEffect } from "react";
import { useAppDispatch } from "../../../utils/hooks";
import { connect as liveOrdersWsConnect, disconnect as liveOrdersWsDisconnect } from "../../../services/actions/ws-actions";
import { WS_URL_ORDERS_ALL } from "../../../utils/api";

export const UserProfileOrders = () => {
const dispatch = useAppDispatch();
const connect = () => dispatch(liveOrdersWsConnect(WS_URL_ORDERS_ALL));
const disconnect = () => dispatch(liveOrdersWsDisconnect());

useEffect(() => {
  connect();

  return () => {
    disconnect();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
      <h1>Orders here soon!</h1>
    </>
  )
}
