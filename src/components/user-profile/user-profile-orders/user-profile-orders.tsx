import React, { useEffect } from "react";
import styles from './user-profile-orders.module.css';
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { connect as liveOrdersWsProfileConnect, disconnect as liveOrdersWsProfileDisconnect } from "../../../services/actions/ws-profile-actions";
import { WS_URL_ORDERS } from "../../../utils/api";
import { getCookie } from "../../../utils/cookies";
import { OrderCard } from "../../orders-feed/order-card/order-card";
import { Link, useLocation } from "react-router-dom";

export const UserProfileOrders = () => {
const location = useLocation();
const dispatch = useAppDispatch();
const accessToken = getCookie('accessToken');
const connect = () => dispatch(liveOrdersWsProfileConnect(`${WS_URL_ORDERS}?token=${accessToken}`));
const disconnect = () => dispatch(liveOrdersWsProfileDisconnect());
const ordersData = useAppSelector(store => store.wsProfileData.data);

useEffect(() => {
  if (accessToken) {
    connect();
  }
  
  return () => {
    disconnect();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className={styles.container}>
      {
          ordersData ? 
          [...ordersData.orders].reverse().map(order => {
            return (
              <Link
                key={order.number}
                to={{
                  pathname: `/profile/orders/${order.number}`,
                  state: { backgroundProfileOrder: location }
                }}
              >
                <OrderCard orderData={order} isInProfile={true} key={order.number}/>
              </Link>
            )})
          :
          <p className="text text_type_main-large">
            Загрузка...
          </p>
        }
    </div>      
  )
}
