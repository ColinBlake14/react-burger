import { useAppSelector } from '../../../utils/hooks';
import { TIngredient, TWsOrderData } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';

type TOrderCardData = {
  orderData: TWsOrderData
}

export const OrderCard = ({ orderData }: TOrderCardData) => {
  const ingredientsData: ReadonlyArray<TIngredient> = useAppSelector(store => store.ingredients.items);
  const picturesArray: Array<string> = [];
  let ingredientsPrice: number = 0;

  const orderDate = new Date(orderData.createdAt);
  const orderDateNumbers = orderDate.toLocaleDateString("ru-RU");
  const orderHours = orderDate.getHours();
  const orderMinutes = orderDate.getMinutes();

  ingredientsData.forEach(item => {
    orderData.ingredients.forEach(ingredient => {
      if (ingredient === item._id) {
        picturesArray.push(item.image_mobile);
        ingredientsPrice += item.price;
      }
    })
  });

  if (picturesArray[0] === picturesArray[1]) {
    picturesArray.shift();
  }

  return (
    <div className={`${styles.order__card} mr-2 mb-4`}>
      <div className={`${styles.top__container} mt-6 mb-6`}>
        <p className="text text_type_digits-default">{`#${orderData.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          {orderDateNumbers} в {orderHours}:{orderMinutes}
        </p>
      </div>

      <div className={styles.middle__container}>
        <p className="text text_type_main-medium">
          {orderData.name}
        </p>
      </div>

      <div className={`${styles.bottom__container} mt-6`}>
        {picturesArray[0] && 
          <div className={styles.ingredient__frame__1}>
            <img className={styles.ingredient__img} src={picturesArray[0]} alt={`Ингредиент бургера`}/>
          </div>
        }
        {picturesArray[1] && 
          <div className={styles.ingredient__frame__2}>
            <img className={styles.ingredient__img} src={picturesArray[1]} alt={`Ингредиент бургера`}/>
          </div>
        }
        {picturesArray[2] && 
          <div className={styles.ingredient__frame__3}>
            <img className={styles.ingredient__img} src={picturesArray[2]} alt={`Ингредиент бургера`}/>
          </div>
        }
        {picturesArray[3] && 
          <div className={styles.ingredient__frame__4}>
            <img className={styles.ingredient__img} src={picturesArray[3]} alt={`Ингредиент бургера`}/>
          </div>
        }
        {picturesArray[4] && 
          <div className={styles.ingredient__frame__5}>
            <img className={styles.ingredient__img} src={picturesArray[4]} alt={`Ингредиент бургера`}/>
          </div>
        }
        {picturesArray[5] &&
          <>
            <div className={styles.ingredient__frame__6}>
              <img className={styles.ingredient__img} src={picturesArray[5]} alt={`Ингредиент бургера`}/>
            </div>
            <p className={`${styles.ingredient__text} text text_type_main-default`}>+{picturesArray.length-5}</p>
          </>
        }

        <p className="text text_type_digits-default mr-2">{ingredientsPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}
