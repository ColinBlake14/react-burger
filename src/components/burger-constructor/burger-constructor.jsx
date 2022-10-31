import React from "react";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerConstructor = ({ingredientsData}) => {
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

        <Button type="primary" size="large" htmlType="button">
          Оформить заказ
        </Button>
      </div>
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
        text={itemData.name}
        price={itemData.price}
        thumbnail={itemData.image}
      />
    </div>
  )
}

export const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired
})

ConstructorItem.propTypes = {
  itemData: itemPropTypes.isRequired,
  pos: PropTypes.string,
  isLocked: PropTypes.bool,
  classNameAdd: PropTypes.string
}