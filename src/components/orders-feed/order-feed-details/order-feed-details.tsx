import { useEffect, useMemo, useState } from 'react';
import styles from './order-feed-details.module.css';
import { useParams } from 'react-router-dom';
import { getFeedOrder } from '../../../utils/api';
import { TIngredient, TWsOrderData } from '../../../utils/types';
import { useAppSelector } from '../../../utils/hooks';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

type TIngredientFeed = TIngredient & {count: number};

export const OrderFeedDetails = () => {
  const { id } = useParams<{id: string}>();
  const ingredientsData: ReadonlyArray<TIngredient> = useAppSelector(store => store.ingredients.items);
  const [ orderDetails, setOrderDetails ] = useState<TWsOrderData | null>(null);
  const [ ingredientsFeedList, setIngredientsFeedList ] = useState<Array<TIngredientFeed>>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ hasError, setHasError ] = useState<boolean>(false);

  const getIngredientsList = (ingredientsIds: Array<string>) => {
    let ingredientsListToState: Array<TIngredientFeed> = [];

    ingredientsIds.forEach(id => {
      let isExist: boolean = false;

      ingredientsListToState?.forEach(elem => {
        if (elem._id === id) {
          elem.count += 1;
          isExist = true;
        }
      });

      if (!isExist) {
        ingredientsListToState.push({...ingredientsData.filter(el => el._id === id)[0], count: 1});
      }
    })

    setIngredientsFeedList(ingredientsListToState);
  }

  useEffect(() => {
    getFeedOrder(id).then(res => {
      if (res) {
        setOrderDetails(res);
      } else {
        setHasError(true);
      }
    }).catch( err => {
        setHasError(true);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ingredientsData && orderDetails) {
      getIngredientsList(orderDetails.ingredients);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsData, orderDetails]);

  const orderSumm = useMemo(() => {
    return ingredientsFeedList?.reduce((prevVal, curVal) => prevVal + curVal.price * curVal.count, 0)
  }, [ingredientsFeedList]);

  return (
    <>
      <div className={styles.order__title}>
        <p className="text text_type_main-medium mb-2">
          {orderDetails?.name}
        </p>
        
        {orderDetails?.status === 'done' ?
          <div className={styles.color__done}>
            <p className="text text_type_main-default">
              Выполнен
            </p>
          </div> 
          : orderDetails?.status === 'pending' ?
          <p className="text text_type_main-default">
            Готовится
          </p>
          : orderDetails?.status === 'created' ?
          <p className="text text_type_main-default">
            Создан
          </p>
          :
          <p className="text text_type_main-default">
            Отменен
          </p>
        }

        <p className="text text_type_main-medium mt-15">
          Состав:
        </p>
      </div>

      <div className={`${styles.ingredients__container} mt-6 mb-10`}>
        {ingredientsFeedList?.map(ingredient => {
          return (
            <div className={styles.ingredient__box} key={ingredient._id}>
              <div className={styles.image__name__box}>
                <div className={styles.ingredient__frame}>
                  <img className={styles.ingredient__img} src={ingredient.image_mobile} alt={`Ингредиент бургера`}/>
                </div>
                <p className="text text_type_main-default ml-6">
                  {ingredient.name}
                </p>
              </div>

              <div className={`${styles.ingredient__price__container} mr-6`}>
                <p className="text text_type_digits-default mr-2">{ingredient.count} x {ingredient.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          )
        })}
      </div>
      
      <div className={`${styles.summary__container} mb-10`}>
        <p className="text text_type_main-default text_color_inactive">
          {orderDetails?.createdAt && <FormattedDate date={new Date(orderDetails?.createdAt)} />}
        </p>

        <div className={styles.summary__price__container}>
          <p className="text text_type_digits-default mr-2">{orderSumm}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  )
}
