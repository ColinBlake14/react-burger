import React from "react"
import styles from './order-details.module.css';
import orderAcceptedImg from "../../images/orderAccepted.png";
import { useSelector } from 'react-redux';

export const OrderDetails = () => {
  const { orderNum, isLoading, hasError, hasData } = useSelector(store => store.bconstructor)

  return (
    <>
      <div className={`${styles.id__box} mb-8`}>
        {hasData ? 
          <p className="text text_type_digits-large">{orderNum}</p>
          :
          isLoading ?
          <p className="text text_type_main-medium">Загрузка...</p>
          :
          hasError ?
          <p className="text text_type_main-medium">Ошибка получения номера заказа</p>
          :
          <p className="text text_type_main-medium">Непредвиденная ошибка ...</p>
        }
      </div>

      <div className={`${styles.id__name__box} mb-15`}>
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>

      <div className={styles.img__container}>
        <img src={orderAcceptedImg} alt="заказ принят"/>
      </div>

      <div className={`${styles.text__box} mt-15 mb-2`}>
        {orderNum ? 
          <p className="text text_type_main-default">Ваш заказ начали готовить</p>
          :
          <p className="text text_type_main-medium">Ваш заказ скоро начнут готовить</p>
        }
      </div>

      <div className={`${styles.text__box} mb-30`}>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    </>
  )
}
