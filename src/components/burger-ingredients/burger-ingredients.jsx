import React, { useState } from "react";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../app-modal/app-modal";
import { ingredientType } from "../../utils/types";
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsContext, ConstructorContext } from "../../utils/app-context";
import { useInView } from "react-intersection-observer";

const { v4: uuidv4 } = require('uuid');

export const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('one');
  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  const { ingredientsData } = React.useContext(IngredientsContext);

  const [ref1] = useInView({
    threshold: 0,
    onChange: (inView1) => {
      if (inView1) {
        setCurrent('one');
      } else if (inView2) {
        setCurrent('two');
      }
    }
  });

  const [ref2, inView2] = useInView({
    threshold: 0,
    onChange: (inView2) => {
      if (!inView2 && inView3) {
        setCurrent('three');
      } else if (inView2 && inView3) {
        setCurrent('two');
      }
    }
  });

  const [ref3, inView3] = useInView({
    threshold: 0,
  });

  function handleOpenModal(item) {
    setCurrentItem(item);
    setVisible(true);
  };

  function handleCloseModal () {
    setVisible(false);
  };

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
        <div ref={ref1} className={`${styles.title} mt-10`}>
          <p className="text text_type_main-medium">
            Булки
          </p>
        </div>

        <div ref={ref1} className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.ingredients.filter(elem => elem.type === "bun").map(item => {
            return <IngredientCard ingredientData={item} key={item._id} handleOpenModal={handleOpenModal} />
          })}
        </div>

        <div ref={ref2} className={`${styles.title} mt-10`}>
          <p className="text text_type_main-medium">
            Соусы
          </p>
        </div>

        <div ref={ref2} className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.ingredients.filter(elem => elem.type === "sauce").map(item => {
            return <IngredientCard ingredientData={item} key={item._id} handleOpenModal={handleOpenModal} />
          })
          }
        </div>

        <div ref={ref3} className={`${styles.title} mt-10`}>
          <p className="text text_type_main-medium">
            Начинки
          </p>
        </div>

        <div ref={ref3} className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.ingredients.filter(elem => elem.type === "main").map(item => {
            return <IngredientCard ingredientData={item} key={item._id} handleOpenModal={handleOpenModal} />
          })}
        </div>
      </div>

      {visible && (
        <Modal header="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredientData={currentItem}/>
        </Modal>
      )}
    </section>
  )
}

const IngredientCard = ({ingredientData, handleOpenModal}) => {
  const { constructorDataDispatcher } = React.useContext(ConstructorContext);
  const { ingredientsData, setIngredientsData } = React.useContext(IngredientsContext);

  const onCardClick = () => {
    const oldIngredients = [...ingredientsData.ingredients];

    if (ingredientData.type === "bun") {
      oldIngredients.forEach(item => {
        if (item.type === "bun") {
          item.__v = 0;
        }
      })
    }

    setIngredientsData({
      ...ingredientsData,
      ingredients: 
        oldIngredients.map(ingredient => {
          if (ingredient._id === ingredientData._id) {
            ingredient.__v += 1;
            return ingredient;
          }
          return ingredient;
        })
    })

    handleOpenModal(ingredientData);
    const ingredientToConstructor = {
      _id: ingredientData._id,
      name: ingredientData.name,
      type: ingredientData.type,
      price: ingredientData.price,
      image: ingredientData.image,
      uuid: uuidv4()
    };
    if (ingredientData.type === "bun") {
      constructorDataDispatcher({type: 'set bun', payload: ingredientToConstructor});
    } else {
      constructorDataDispatcher({type: 'set ingredient', payload: ingredientToConstructor});
    }
  };

  return (
    <div className={styles.card} onClick={onCardClick}>
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
