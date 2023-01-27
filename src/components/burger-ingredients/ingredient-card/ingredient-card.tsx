import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import styles from './ingredient-card.module.css';
import { TIngredient } from "../../../utils/types";

type TIngredientData = {
  ingredientData: TIngredient
}

export const IngredientCard = ( { ingredientData }: TIngredientData ) => {
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

  return (
    <div className={styles.card} ref={dragRef} data-testid={ingredientData.name}>
      <img className={styles.card__img} src={ingredientData.image_large} alt={ingredientData.name}/>
      {ingredientData.__v !== 0 && <Counter extraClass={styles.counter} count={ingredientData.__v} size="default"/>}
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
