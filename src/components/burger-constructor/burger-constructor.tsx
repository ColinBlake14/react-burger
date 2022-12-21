import React, { useState, useMemo } from "react";
import styles from './burger-constructor.module.css';
import { OrderDetails } from "./order-details/order-details";
import { Modal } from "../app-modal/app-modal";
import { getOrderNum } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { ConstructorItem } from "./constructor-item/constructor-item";
import { useHistory } from "react-router-dom";

import { 
  Button, 
  CurrencyIcon 
} from '@ya.praktikum/react-developer-burger-ui-components'

import { 
  RESET_INGREDIENTS, 
  RESET_MODAL_NUM_DATA,
  SET_INGREDIENT,
  SET_BUN
} from "../../services/actions/burger-constructor";

import { 
  RESET_INGREDIENTS_COUNT,
  RESET_BUNS_COUNT,
  INCREASE_ITEM
} from "../../services/actions/burger-ingredients";
import { TRootState } from "../../services/reducers";
import { TIngredientConstructor } from "../../utils/types";
import { AnyAction } from "redux";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { bun , ingredients, isModalVisible } = useSelector((store: TRootState) => store.bconstructor);
  
  const isUserLoginSuccess = useSelector((store: TRootState) => store.registerLoginUser.loginSuccess);

  const [{isHoverIngredient}, dropIngredient] = useDrop({
    accept: "ingredient",
    drop(item: TIngredientConstructor) {
      dispatch({ type: INCREASE_ITEM, _id: item._id });
      dispatch({ type: SET_INGREDIENT, ingredient: item });
    },
    collect: monitor => ({
      isHoverIngredient: monitor.isOver(),
    })
  });

  const [{isHoverBun}, dropBun] = useDrop({
    accept: "bun",
    drop(item: TIngredientConstructor) {
      dispatch({ type: RESET_BUNS_COUNT });
      dispatch({ type: INCREASE_ITEM, _id: item._id });
      dispatch({ type: SET_BUN, bun: item });
    },
    collect: monitor => ({
      isHoverBun: monitor.isOver(),
    })
  });

  function handleOpenModal() {
    if (!isUserLoginSuccess) {
      history.push("/login", { from: "/" });
    } else {
      if (bun && ingredients.length) {
        let orderIds = ingredients.map(item => item._id);
        orderIds.push(bun._id);
        let orderIdsToSend = { 
          ingredients: [...orderIds]
        };
        
        dispatch({ type: RESET_INGREDIENTS });
        dispatch({ type: RESET_INGREDIENTS_COUNT });
        dispatch(getOrderNum(orderIdsToSend) as unknown as AnyAction);
      }
    }
  };

  function handleCloseModal() {
    dispatch({ type: RESET_MODAL_NUM_DATA });
  };

  useMemo(() => {
    let sum = 0;
      if (ingredients.length) {
        // @ts-ignore:next-line
        sum += ingredients.reduce((acc, curVal) => acc + curVal.price, 0);
      }
      if (bun) {
        sum += bun.price * 2;
      }

      setTotalPrice(sum);
  }, [ingredients, bun])

  const topBunContent = useMemo(() => {
    return bun ? (
      <ConstructorItem classNameAdd="pr-4 pl-4" itemData={bun}
        key={bun._id} pos="top" isLocked={true}/>
    )
    :
    (
      <div className={
          isHoverBun ?
          `${styles.empty__bun} ${styles.empty__top__bun} ${styles.hovered}`
          :
          `${styles.empty__bun} ${styles.empty__top__bun}`
        }>
        <p className="text text_type_main-default">
          Выберите булку для вашего бургера
        </p>
      </div>
    )
  },[bun, isHoverBun]);

  const ingredientsContent = useMemo(() => {
    return ingredients.length ? (
      <div 
        className={
          isHoverIngredient ? 
          `${styles.ingredients__container__wrapper} ${styles.hovered} pr-2 pl-4` 
          :
          `${styles.ingredients__container__wrapper} pr-2 pl-4`
        } 
        ref={dropIngredient}
      >
        {ingredients.map((item, index) => {
          return <ConstructorItem itemData={item} key={item.uuid} index={index} id={item.uuid}/>
        })}
      </div>
    )
    :
    (
      <div 
        className={
          isHoverIngredient ? 
          `${styles.empty__bun} ${styles.empty__middle__bun} ${styles.hovered}`
          :
          `${styles.empty__bun} ${styles.empty__middle__bun}`
        } 
        ref={dropIngredient}
      >
        <p className="text text_type_main-default">
          Начинка тоже не помешает
        </p>
      </div>
    )
  }, [ingredients, isHoverIngredient, dropIngredient]);

  const bottomBunContent = useMemo(() => {
    return bun ? (
      <ConstructorItem classNameAdd="pr-4 pl-4" itemData={bun}
        pos="bottom" isLocked={true}/>
    )
    :
    (
      <div className={
          isHoverBun ?
          `${styles.empty__bun} ${styles.empty__bottom__bun} ${styles.hovered}`
          :
          `${styles.empty__bun} ${styles.empty__bottom__bun}`
        }>
        <p className="text text_type_main-default">
          Брат булки сверху (только снизу)
        </p>
      </div>
    )
  }, [bun, isHoverBun]);

  return (
    <section className={styles.container}>
      <div className={`${styles.ingredients__container}`} ref={dropBun}>
        {topBunContent}
        
        {ingredientsContent}
        
        {bottomBunContent}
      </div>

      <div className={`${styles.summ__container} mt-10 ml-4 mr-4`}>
        <div className={styles.summ}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary"/>
        </div>

        <Button type="primary" size="large" htmlType="button" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {isModalVisible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails/>
        </Modal>
      )}
    </section>
  )
}
