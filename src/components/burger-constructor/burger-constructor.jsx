import React, {useEffect, useState} from "react";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../app-modal/app-modal";
import { constructorIngredientType } from "../../utils/types";
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorContext, IngredientsContext } from "../../utils/app-context";
import { postOrder } from '../../utils/api';

export const BurgerConstructor = () => {
  const [visible, setVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderNum, setOrderNum] = useState(0);

  const { constructorData } = React.useContext(ConstructorContext);

  function handleOpenModal() {
    if (constructorData.bun && constructorData.ingredients.length) {
      let orderIds = constructorData.ingredients.map(item => item._id);
      orderIds.push(constructorData.bun._id);
      orderIds = { 
        ingredients: [...orderIds]
      };
      
      try {
        postOrder(orderIds).then(res => {
          setOrderNum(res.order.number);
          setVisible(true);
        })
      } catch (err) {
        console.log('ERR ', err);
      }
      return orderNum;
    }
  };

  function handleCloseModal() {
    setVisible(false);
  };

  useEffect(() => {
    const changePrice = () => {
      let sum = 0;
      if (constructorData.ingredients.length) {
        sum += constructorData.ingredients.reduce((acc, curVal) => acc + curVal.price, 0);
      }
      if (constructorData.bun) {
        sum += constructorData.bun.price * 2;
      }
      setTotalPrice(sum);
    };

    changePrice();
  }, [constructorData]);

  return (
    <section className={styles.container}>
      <div className={`${styles.ingredients__container}`}>
        {constructorData.bun ? (
          <ConstructorItem classNameAdd="pr-4 pl-4" itemData={constructorData.bun}
            key={constructorData.bun._id} pos="top" isLocked={true}/>
        )
        :
        (
          <div className={`${styles.empty__bun} ${styles.empty__top__bun}`}>
            <p className="text text_type_main-default">
              Выберите булку для вашего бургера
            </p>
          </div>
        )}
        
        {constructorData.ingredients.length ? (
          <div className={`${styles.ingredients__container__wrapper} pr-2 pl-4`}>
            {constructorData.ingredients.map(item => {
              return <ConstructorItem itemData={item} key={item.uuid}/>
            })}
          </div>
        )
        :
        (
          <div className={`${styles.empty__bun} ${styles.empty__middle__bun}`}>
            <p className="text text_type_main-default">
              Начинка тоже не помешает
            </p>
          </div>
        )}
        
        {constructorData.bun ? (
          <ConstructorItem classNameAdd="pr-4 pl-4" itemData={constructorData.bun}
            pos="bottom" isLocked={true}/>
        )
        :
        (
          <div className={`${styles.empty__bun} ${styles.empty__bottom__bun}`}>
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

      {visible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderId={orderNum}/>
        </Modal>
      )}
    </section>
  )
}

const ConstructorItem = ({itemData, pos, isLocked, classNameAdd}) => {
  const { constructorDataDispatcher } = React.useContext(ConstructorContext);
  const { ingredientsData, setIngredientsData } = React.useContext(IngredientsContext);

  const onClick = () => {
    if (itemData.type === "bun") {
      constructorDataDispatcher({type: 'delete bun'});
    } else {
      constructorDataDispatcher({type: 'delete ingredient', payload: itemData.uuid});
    }

    const oldIngredients = [...ingredientsData.ingredients];

    setIngredientsData({
      ...ingredientsData,
      ingredients: 
        oldIngredients.map(ingredient => {
          if (ingredient._id === itemData._id) {
            ingredient.__v -= 1;
            return ingredient;
          }
          return ingredient;
        })
    })
  }

  return (
    <div className={`${styles.constructor__item} ${classNameAdd}`} onClick={onClick}>
      {isLocked ? 
      (<div className={styles.drag__item__container}/>)
      : 
      (<div className={styles.drag__item__container}>
        <DragIcon type="primary" />
      </div>)
      }
      <ConstructorElement
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
  classNameAdd: PropTypes.string
}
