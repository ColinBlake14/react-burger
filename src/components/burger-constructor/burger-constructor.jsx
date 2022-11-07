import React, {useState} from "react";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../app-modal/app-modal";
import { ingredientType } from "../../utils/types";
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerConstructor = ({ingredientsData}) => {
  const [visible, setVisible] = useState(false);

  function handleOpenModal(item) {
    setVisible(true);
  };

  function handleCloseModal () {
    setVisible(false);
  };

  return (
    <section className={styles.container}>
      <div className={`${styles.ingredients__container}`}>
        <ConstructorItem classNameAdd="pr-4 pl-4" itemData={ingredientsData[0]}
         key={ingredientsData[0]._id} pos="top" isLocked={true}/>
        
        <div className={`${styles.ingredients__container__wrapper} pr-2 pl-4`}>
          {ingredientsData.filter(elem => elem.type !== "bun").map(item => {
            return <ConstructorItem itemData={item} key={item._id}/>
          })}
        </div>
        
        <ConstructorItem classNameAdd="pr-4 pl-4" itemData={ingredientsData[0]}
          pos="bottom" isLocked={true}/>
      </div>

      <div className={`${styles.summ__container} mt-10 ml-4 mr-4`}>
        <div className={styles.summ}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary"/>
        </div>

        <Button type="primary" size="large" htmlType="button" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {visible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderId="034536"/>
        </Modal>
      )}
    </section>
  )
}

const ConstructorItem = ({itemData, pos, isLocked, classNameAdd}) => {
  return (
    <div className={`${styles.constructor__item} ${classNameAdd}`}>
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
  itemData: ingredientType.isRequired,
  pos: PropTypes.string,
  isLocked: PropTypes.bool,
  classNameAdd: PropTypes.string
}

BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired
}
