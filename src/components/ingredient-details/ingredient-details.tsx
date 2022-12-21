import React, {useEffect, useState} from "react"
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { TRootState } from "../../services/reducers";
import { TIngredient } from "../../utils/types";

export const IngredientDetails = () => {
  const { id } = useParams<{id: string}>();
  const [ingredientData, setIngredientData] = useState<TIngredient>();

  const ingredientsData: Array<TIngredient> | null = useSelector((store: TRootState) => store.ingredients.items);

  useEffect(() => {
    if (ingredientsData) {
      setIngredientData(ingredientsData.filter((item) => item._id === id)[0]);
    }
  }, [ingredientsData, id]);

  return (
    <>
      {ingredientData ? (
        <>
          <img className={`${styles.modal__card__img} mb-4`} 
          src={ingredientData.image_large} alt={ingredientData.name}/>
          <div className={`${styles.modal__ingredient__name} mb-8`}>
            <p className="text text_type_main-medium">
              {ingredientData.name}
            </p>
          </div>
          <div className={`${styles.modal__ingredient__add__container} mb-15`}>
            <div className={styles.modal__ingredient__big__add}>
              <p className="text text_type_main-default text_color_inactive">
                Калории,ккал
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {ingredientData.calories}
              </p>
            </div>
            <div className={styles.modal__ingredient__add}>
              <p className="text text_type_main-default text_color_inactive">
                Белки, г
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {ingredientData.proteins}
              </p>
            </div>
            <div className={styles.modal__ingredient__add}>
              <p className="text text_type_main-default text_color_inactive">
                Жиры, г
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {ingredientData.fat}
              </p>
            </div>
            <div className={styles.modal__ingredient__add}>
              <p className="text text_type_main-default text_color_inactive">
                Углеводы, г
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {ingredientData.carbohydrates}
              </p>
            </div>
          </div>
        </>
      ) : 
        null
      }
    </>
  )
}
