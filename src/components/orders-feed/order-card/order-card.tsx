import { useAppSelector } from '../../../utils/hooks';
import { TIngredient, TWsOrderData } from '../../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';

type TOrderCardData = {
  orderData: TWsOrderData,
  isInProfile: boolean
}

export const OrderCard = ({ orderData, isInProfile }: TOrderCardData) => {
  const ingredientsData: ReadonlyArray<TIngredient> = useAppSelector(store => store.ingredients.items);
  const picturesArray: Array<string> = [];
  let ingredientsPrice: number = 0;

  const dateFromServer = orderData.createdAt;

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
      <div className={`${styles.top__container} mb-6`}>
        <p className="text text_type_digits-default">{`#${orderData.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(dateFromServer)} />
        </p>
      </div>

      <div className={styles.middle__container}>
        <p className="text text_type_main-medium">
          {orderData.name}
        </p>

        {isInProfile && <>
          {orderData?.status === 'done' ?
          <div className={styles.color__done}>
            <p className="text text_type_main-default">
              Выполнен
            </p>
          </div> 
          : orderData?.status === 'pending' ?
          <p className="text text_type_main-default">
            Готовится
          </p>
          : orderData?.status === 'created' ?
          <p className="text text_type_main-default">
            Создан
          </p>
          :
          <p className="text text_type_main-default">
            Отменен
          </p>
          }
        </>}
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
