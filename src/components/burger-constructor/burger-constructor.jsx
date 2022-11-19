import React, { useState, useMemo, useRef } from "react";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../app-modal/app-modal";
import { constructorIngredientType } from "../../utils/types";
import { getOrderNum } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";

import { 
  ConstructorElement,
  DragIcon, 
  Button, 
  CurrencyIcon 
} from '@ya.praktikum/react-developer-burger-ui-components'

import { 
  RESET_INGREDIENTS, 
  DELETE_BUN, 
  DELETE_INGREDIENT,
  RESET_MODAL_NUM_DATA,
  SET_INGREDIENT,
  SET_BUN,
  MOVE_INGREDIENT
} from "../../services/actions/burger-constructor";

import { 
  RESET_INGREDIENTS_COUNT, 
  DECREASE_ITEM, 
  RESET_BUNS_COUNT,
  INCREASE_ITEM
} from "../../services/actions/burger-ingredients";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);

  const { bun , ingredients, isModalVisible } = useSelector(store => store.bconstructor);

  const [{isHoverIngredient}, dropIngredient] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({ type: INCREASE_ITEM, _id: item._id });
      dispatch({ type: SET_INGREDIENT, ingredient: item });
    },
    collect: monitor => ({
      isHoverIngredient: monitor.isOver(),
    })
  });

  const [{isHoverBun}, dropBun] = useDrop({
    accept: "bun",
    drop(item) {
      dispatch({ type: RESET_BUNS_COUNT });
      dispatch({ type: INCREASE_ITEM, _id: item._id });
      dispatch({ type: SET_BUN, bun: item });
    },
    collect: monitor => ({
      isHoverBun: monitor.isOver(),
    })
  });

  function handleOpenModal() {
    if (bun && ingredients.length) {
      let orderIds = ingredients.map(item => item._id);
      orderIds.push(bun._id);
      orderIds = { 
        ingredients: [...orderIds]
      };
      
      dispatch({ type: RESET_INGREDIENTS });
      dispatch({ type: RESET_INGREDIENTS_COUNT });
      dispatch(getOrderNum(orderIds));
    }
  };

  function handleCloseModal() {
    dispatch({ type: RESET_MODAL_NUM_DATA });
  };

  useMemo(() => {
    let sum = 0;
      if (ingredients.length) {
        sum += ingredients.reduce((acc, curVal) => acc + curVal.price, 0);
      }
      if (bun) {
        sum += bun.price * 2;
      }

      setTotalPrice(sum);
  }, [ingredients, bun])

  return (
    <section className={styles.container}>
      <div className={`${styles.ingredients__container}`} ref={dropBun}>
        {bun ? (
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
        )}
        
        {ingredients.length ? (
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
        )}
        
        {bun ? (
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
        )}
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

const ConstructorItem = ({itemData, pos, isLocked, classNameAdd, index, id}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      };

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      };

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      };
      
      dispatch({ type: MOVE_INGREDIENT, fromIndex: dragIndex, toIndex: hoverIndex });
      item.index = hoverIndex;
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onClick = () => {
    if (itemData.type === "bun") {
      dispatch({ type: DELETE_BUN });
      dispatch({ type: RESET_BUNS_COUNT });
    } else {
      dispatch({ type: DELETE_INGREDIENT, uuid: itemData.uuid });
      dispatch({ type: DECREASE_ITEM, _id: itemData._id });
    }
  }

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div className={`${styles.constructor__item} ${classNameAdd}`} 
      style={{opacity}} ref={itemData.type === 'bun' ? null : ref} data-handler-id={handlerId}>
      {isLocked ? 
      (<div className={styles.drag__item__container}/>)
      : 
      (<div className={styles.drag__item__container}>
        <DragIcon type="primary" />
      </div>)
      }
      <ConstructorElement
        handleClose={onClick}
        type={pos}
        isLocked={isLocked}
        text={
          pos ? 
          (pos === "top" ? itemData.name + " (верх)" : itemData.name + " (низ)") 
          : 
          itemData.name
        }
        price={itemData.price}
        thumbnail={itemData.image}
      />
    </div>
  )
}

ConstructorItem.propTypes = {
  itemData: constructorIngredientType.isRequired,
  pos: PropTypes.string,
  isLocked: PropTypes.bool,
  classNameAdd: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.string
}
