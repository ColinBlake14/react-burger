import React, { useEffect } from "react";
import { useAppDispatch } from "../../../utils/hooks";
import { connect as liveOrdersWsConnect, disconnect as liveOrdersWsDisconnect } from "../../../services/actions/ws-actions";

export const UserProfileOrders = () => {
const URL = 'wss://norma.nomoreparties.space/orders/all';
const dispatch = useAppDispatch();
const connect = () => dispatch(liveOrdersWsConnect(URL));
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
