import React, { useState } from "react";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../app-modal/app-modal";
import { ingredientType } from "../../utils/types";
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerIngredients = ({ingredientsData}) => {
  const [current, setCurrent] = React.useState('one');
  return (
    <section className={styles.container}>
      <div className={`${styles.title} mt-10 mb-5`}>
        <p className="text text_type_main-large">
          Соберите бургер
        </p>
      </div>

      <div className={styles.tab__container}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.ingredients__container}>
        <div className={`${styles.title} mt-10`}>
          <p className="text text_type_main-medium">
            Булки
          </p>
        </div>

        <div className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.filter(elem => elem.type === "bun").map(item => {
            return <IngredientCard ingredientData={item} key={item._id} />
          })}
        </div>

        <div className={`${styles.title} mt-10`}>
          <p className="text text_type_main-medium">
            Соусы
          </p>
        </div>

        <div className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.filter(elem => elem.type === "sauce").map(item => {
            return <IngredientCard ingredientData={item} key={item._id} />
          })
          }
        </div>

        <div className={`${styles.title} mt-10`}>
          <p className="text text_type_main-medium">
            Начинки
          </p>
        </div>

        <div className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.filter(elem => elem.type === "main").map(item => {
            return <IngredientCard ingredientData={item} key={item._id} />
          })}
        </div>
      </div>
    </section>
  )
}

const IngredientCard = ({ingredientData}) => {
  const [visible, setVisible] = useState(false);

  function handleOpenModal() {
    setVisible(true);
  };

  function handleCloseModal () {
    setVisible(false);
  };

  const modal = (
    <Modal header="Детали ингредиента" onClose={handleCloseModal}>
      <IngredientDetails ingredientData={ingredientData}/>
    </Modal>
  )

  return (
    <div className={styles.card} onClick={handleOpenModal}>
      <img className={styles.card__img} src={ingredientData.image_large} alt={ingredientData.name}/>
      <Counter className={styles.counter} count={1} size="default"/>
      <div className={`${styles.price} pt-1 pb-1`}>
        <p className="text text_type_digits-default">{ingredientData.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.description}>
        <p className="text text_type_main-default">
          {ingredientData.name}
        </p>
      </div>

      {visible && modal}
    </div>
  )
}

IngredientCard.propTypes = {
  ingredientData: ingredientType.isRequired
}

BurgerIngredients.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired
}