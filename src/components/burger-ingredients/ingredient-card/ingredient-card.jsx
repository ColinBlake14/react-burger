import React from "react";
import PropTypes from 'prop-types';
import { ingredientType } from "../../../utils/types";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import styles from './ingredient-card.module.css';

export const IngredientCard = ({ingredientData, handleOpenModal}) => {
  const [, dragRef] = useDrag({
    type: ingredientData.type === "bun" ? "bun" : "ingredient",
    item: {
      _id: ingredientData._id,
      name: ingredientData.name,
      type: ingredientData.type,
      price: ingredientData.price,
      image: ingredientData.image,
      uuid: uuidv4()
    }
  });

  const onCardClick = () => {
    handleOpenModal(ingredientData);
  };

  return (
    <div className={styles.card} onClick={onCardClick} ref={dragRef}>
      <img className={styles.card__img} src={ingredientData.image_large} alt={ingredientData.name}/>
      {ingredientData.__v !== 0 && <Counter className={styles.counter} count={ingredientData.__v} size="default"/>}
      <div className={`${styles.price} pt-1 pb-1`}>
        <p className="text text_type_digits-default">{ingredientData.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.description}>
        <p className="text text_type_main-default">
          {ingredientData.name}
        </p>
      </div>   
    </div>
  )
}

IngredientCard.propTypes = {
  ingredientData: ingredientType.isRequired,
  handleOpenModal: PropTypes.func.isRequired
}
