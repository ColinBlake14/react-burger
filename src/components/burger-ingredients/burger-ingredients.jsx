import React, { useRef, useEffect, useMemo } from "react";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../app-modal/app-modal";
import { ingredientType } from "../../utils/types";
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from "../../services/actions/burger-ingredients";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

import { 
  SET_MODAL_DATA, 
  RESET_MODAL_DATA,
  SET_CURRENT_TAB
} from "../../services/actions/burger-ingredients";

export const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const bunSection = useRef(null);
  const sauceSection = useRef(null);
  const mainSection = useRef(null);
  
  const ingredientsData = useSelector(store => store.ingredients.items);
  const { hasData, isModalVisible, currentTab } = useSelector(store => store.ingredients);

  useEffect(
    () => {
      if (!ingredientsData.length) {
        dispatch(getItems());
      }
    },[]
  );

  function scrollToSection(num) {
    switch (num) {
      case 1:
        dispatch({ type: SET_CURRENT_TAB, tab: 'one' });
        bunSection.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 2:
        dispatch({ type: SET_CURRENT_TAB, tab: 'two' });
        sauceSection.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 3:
        dispatch({ type: SET_CURRENT_TAB, tab: 'three' });
        mainSection.current.scrollIntoView({ behavior: "smooth" });
        break;
      default: break;
    }
  };

  const [ref1] = useInView({
    threshold: 0,
    onChange: (inView1) => {
      if (inView1) {
        dispatch({ type: SET_CURRENT_TAB, tab: 'one' });
      } else if (inView2) {
        dispatch({ type: SET_CURRENT_TAB, tab: 'two' });
      }
    }
  });

  const [ref2, inView2] = useInView({
    threshold: 0,
    onChange: (inView2) => {
      if (!inView2 && inView3) {
        dispatch({ type: SET_CURRENT_TAB, tab: 'three' });
      } else if (inView2 && inView3) {
        dispatch({ type: SET_CURRENT_TAB, tab: 'two' });
      }
    }
  });

  const [ref3, inView3] = useInView({
    threshold: 0,
  });

  function handleOpenModal(item) {
    dispatch({ type: SET_MODAL_DATA, modalItem: item });
  };

  function handleCloseModal () {
    dispatch({ type: RESET_MODAL_DATA});
  };

  const tabContent = useMemo(() => {
    return (
      <div className={styles.tab__container}>
        <Tab value="one" active={currentTab === 'one'} onClick={() => scrollToSection(1)}>
          Булки
        </Tab>
        <Tab value="two" active={currentTab === 'two'} onClick={() => scrollToSection(2)}>
          Соусы
        </Tab>
        <Tab value="three" active={currentTab === 'three'} onClick={() => scrollToSection(3)}>
          Начинки
        </Tab>
      </div>
    )
  }, [currentTab]);

  const ingredientsContent = useMemo(() => {
    return (
      <div className={styles.ingredients__container}>
        <div ref={bunSection} className={`${styles.title} mt-10`}>
          <p ref={ref1} className="text text_type_main-medium">
            Булки
          </p>
        </div>

        <div ref={ref1} className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.filter(elem => elem.type === "bun").map(item => {
            return <IngredientCard ingredientData={item} key={item._id} handleOpenModal={handleOpenModal} />
          })}
        </div>

        <div ref={sauceSection} className={`${styles.title} mt-10`}>
          <p ref={ref2} className="text text_type_main-medium">
            Соусы
          </p>
        </div>

        <div ref={ref2} className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.filter(elem => elem.type === "sauce").map(item => {
            return <IngredientCard ingredientData={item} key={item._id} handleOpenModal={handleOpenModal} />
          })
          }
        </div>

        <div ref={mainSection} className={`${styles.title} mt-10`}>
          <p ref={ref3} className="text text_type_main-medium">
            Начинки
          </p>
        </div>

        <div ref={ref3} className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.filter(elem => elem.type === "main").map(item => {
            return <IngredientCard ingredientData={item} key={item._id} handleOpenModal={handleOpenModal} />
          })}
        </div>
      </div>
    )
  }, [ingredientsData, ref1, ref2, ref3]);

  const content = useMemo(() => {
    return hasData ? (
      <>
        <div className={`${styles.title} mt-10 mb-5`}>
          <p className="text text_type_main-large">
            Соберите бургер
          </p>
        </div>

        {tabContent}

        {ingredientsContent}
      </>
    ) : (
      <p className="text text_type_main-medium">Данные не были получены</p>
    )
  }, [hasData, tabContent, ingredientsContent]
  );

  return (
    <section className={styles.container}>
      {content}
    
      {isModalVisible && (
        <Modal header="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails/>
        </Modal>
      )}
    </section>
  )
}

const IngredientCard = ({ingredientData, handleOpenModal}) => {
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
