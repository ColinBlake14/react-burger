import React, { useRef, useMemo } from "react";
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from 'react-redux';
import { IngredientCard } from "./ingredient-card/ingredient-card";
import { Link, useLocation } from "react-router-dom";

import { 
  SET_CURRENT_TAB
} from "../../services/actions/burger-ingredients";
import { TRootState } from "../../services/reducers";
import { TIngredient } from "../../utils/types";

export const BurgerIngredients = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const bunSection = useRef<HTMLDivElement>(null);
  const sauceSection = useRef<HTMLDivElement>(null);
  const mainSection = useRef<HTMLDivElement>(null);
  
  const ingredientsData: Array<TIngredient> = useSelector((store: TRootState) => store.ingredients.items);
  const { hasData, currentTab } = useSelector((store: TRootState) => store.ingredients);

  function scrollToSection(num: number) {
    switch (num) {
      case 1:
        dispatch({ type: SET_CURRENT_TAB, tab: 'one' });
        bunSection.current!.scrollIntoView({ behavior: "smooth" });
        break;
      case 2:
        dispatch({ type: SET_CURRENT_TAB, tab: 'two' });
        sauceSection.current!.scrollIntoView({ behavior: "smooth" });
        break;
      case 3:
        dispatch({ type: SET_CURRENT_TAB, tab: 'three' });
        mainSection.current!.scrollIntoView({ behavior: "smooth" });
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            return (
              <Link
                className={styles.link}
                key={item._id}
                to={{
                  pathname: `/ingredients/${item._id}`,
                  state: { background: location }
                }}
              >
                <IngredientCard ingredientData={item} key={item._id} />
              </Link>
            )
          })}
        </div>

        <div ref={sauceSection} className={`${styles.title} mt-10`}>
          <p ref={ref2} className="text text_type_main-medium">
            Соусы
          </p>
        </div>

        <div ref={ref2} className={`${styles.card__container} pt-6 pl-4 pr-2 pb-10`}>
          {ingredientsData.filter(elem => elem.type === "sauce").map(item => {
            return (
              <Link
                className={styles.link}
                key={item._id}
                to={{
                  pathname: `/ingredients/${item._id}`,
                  state: { background: location }
                }}
              >
                <IngredientCard ingredientData={item} key={item._id} />
              </Link>
            )
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
            return (
              <Link
                className={styles.link}
                key={item._id}
                to={{
                  pathname: `/ingredients/${item._id}`,
                  state: { background: location }
                }}
              >
                <IngredientCard ingredientData={item} key={item._id} />
              </Link>
            )
          })}
        </div>
      </div>
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    </section>
  )
}
