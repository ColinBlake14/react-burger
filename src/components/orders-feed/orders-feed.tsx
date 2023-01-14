import React, { useEffect, useState } from "react";
import styles from './orders-feed.module.css';
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { connect as liveOrdersWsConnect, disconnect as liveOrdersWsDisconnect } from "../../services/actions/ws-actions";
import { WS_URL_ORDERS_ALL } from "../../utils/api";
import { OrderCard } from "./order-card/order-card";
import { Link, useLocation } from "react-router-dom";

export const OrdersFeed = () => {
  const dispatch = useAppDispatch();
  const connect = () => dispatch(liveOrdersWsConnect(WS_URL_ORDERS_ALL));
  const disconnect = () => dispatch(liveOrdersWsDisconnect());
  const location = useLocation();

  const ordersData = useAppSelector(store => store.wsData.data);
  const [readyOrders, setReadyOrders] = useState<Array<number | undefined> | undefined>([]);
  const [pendingOrders, setPendingOrders] = useState<Array<number | undefined> | undefined>([]);

  useEffect(() => {
    connect();
  
    return () => {
      disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let pendingOrdersArr: Array<number> = [];
    let readyOrdersArr: Array<number> = [];
    ordersData?.orders
      .forEach(order => {
        if (order.status === 'done') {
          readyOrdersArr.push(order.number);
        }
        else if (order.status === 'pending') {
          pendingOrdersArr.push(order.number)
        }
      });

      setReadyOrders(readyOrdersArr);
      setPendingOrders(pendingOrdersArr);
  }, [ordersData])

  return (
    <div className={styles.container}>
      <div className={`${styles.feed__header} mt-10 mb-5`}>
        <p className="text text_type_main-large">
          Лента заказов
        </p>
      </div>

      <div className={styles.orders__container}>
        {
          ordersData ? 
          ordersData.orders.map(order => {
            return (
              <Link
                key={order.number}
                to={{
                  pathname: `/feed/${order.number}`,
                  state: { backgroundOrder: location }
                }}
              >
                <OrderCard orderData={order} isInProfile={false} key={order.number}/>
              </Link>
            )})
          :
          <p className="text text_type_main-large">
            Загрузка...
          </p>
        }
      </div>

      { ordersData && 
      <div className={styles.overall__container}>
        <div className={styles.overall__header}>
          <p className="text text_type_main-medium">Готовы:</p>
          <p className="text text_type_main-medium">В работе:</p>
        </div>

        <div className={styles.order__numbers}>
          <div className={styles.orders__big__container}>
            <div className={styles.ready__orders__small__container}>
              {readyOrders && readyOrders.map((order, index) => {
                if (index < 10) {
                  return <p className="text text_type_digits-default" key={order}>{order}</p>;
                }
                else return null;
              })}
            </div>
            <div className={styles.ready__orders__small__container}>
              {readyOrders && readyOrders[10] && readyOrders.map((order, index) => {
                if (index >= 10 && index < 20) {
                  return <p className="text text_type_digits-default" key={order}>{order}</p>;
                }
                else return null;
              })}
            </div>
          </div>

          <div className={styles.orders__big__container}>
            <div className={styles.pending__orders__small__container}>
              {pendingOrders && pendingOrders.map((order, index) => {
                if (index < 10) {
                  return <p className="text text_type_digits-default" key={order}>{order}</p>;
                }
                else return null;
              })}
            </div>
            <div className={styles.pending__orders__small__container}>
              {pendingOrders && pendingOrders[10] && pendingOrders.map((order, index) => {
                if (index >= 10 && index < 20) {
                  return <p className="text text_type_digits-default" key={order}>{order}</p>;
                }
                else return null;
              })}
            </div>
          </div>
        </div>

        <div className={styles.overall__orders__container}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={`${styles.numbers__shadow} text text_type_digits-large`}>{ordersData?.total}</p>
        </div>
        
        <div className={styles.overall__orders__container}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`${styles.numbers__shadow} text text_type_digits-large`}>{ordersData?.totalToday}</p>
        </div>
      </div> }
    </div>
  )
}
