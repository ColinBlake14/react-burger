import React from "react";
import styles from './burger-ingredients.module.css';
import { itemPropTypes } from "../burger-constructor/burger-constructor";
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

      <div style={{ display: 'flex' }}>
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
      </div>
    </section>
  )
}

const IngredientCard = ({ingredientData}) => {
  return (
    <div className={styles.card}>
      <img className={styles.card__img} src={ingredientData.image_large} alt="картинка"/>
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
    </div>
  )
}

IngredientCard.propTypes = {
  ingredientData: itemPropTypes.isRequired
}