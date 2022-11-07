import React from "react"
import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import orderAcceptedImg from "../../images/orderAccepted.png";

export const OrderDetails = ({orderId}) => {
  return (
    <>
      <div className={`${styles.id__box} mb-8`}>
        <p className="text text_type_digits-large">{orderId}</p>
      </div>

      <div className={`${styles.id__name__box} mb-15`}>
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>

      <div className={styles.img__container}>
        <img src={orderAcceptedImg} alt="заказ принят"/>
      </div>

      <div className={`${styles.text__box} mt-15 mb-2`}>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      </div>

      <div className={`${styles.text__box} mb-30`}>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    </>
  )
}

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired
}
