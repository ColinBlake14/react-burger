import React, { useEffect } from "react";
import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authUserRequest } from '../../services/actions/register-login-user';
import { getItems } from "../../services/actions/burger-ingredients";
import { TRootState } from "../../services/reducers";
import { AnyAction } from "redux";

export const AppHeader = () => {
  const dispatch = useDispatch();

  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isFeed = !!useRouteMatch('/feed');
  const isProfile = !!useRouteMatch('/profile');
  const isUserLoginSuccess = useSelector((store: TRootState) => store.registerLoginUser.loginSuccess);
  const userData = useSelector((store: TRootState) => store.registerLoginUser.user);

  const mainTextColor = "text text_type_main-default ml-2";
  const inactiveTextColor = "text text_type_main-default text_color_inactive ml-2";

  const ingredientsData = useSelector((store: TRootState) => store.ingredients.items);

  useEffect(
    () => {
      if (!ingredientsData.length) {
        dispatch(getItems() as unknown as AnyAction);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
  );

  useEffect(() => {
    if (!isUserLoginSuccess) {
      dispatch(authUserRequest() as unknown as AnyAction);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header>
      <nav className={`${styles.header} pt-4 pb-4`}>
        <div className={`${styles.navigation__link} ${styles.push__left}`}>
          <Link to={{ pathname: `/` }} className={styles.link}>
            <div className={`${styles.navigation__link} pt-4 pb-4 pl-5 pr-5`}>
              <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
              <p className={isConstructor ? mainTextColor : inactiveTextColor}>
                Конструктор
              </p>
            </div>
          </Link>

          <div className={`${styles.navigation__link} pt-4 pb-4 pl-5 pr-5 ml-2`}>
          <ListIcon type={isFeed ? "primary" : "secondary"} />
            <p className={isFeed ? mainTextColor : inactiveTextColor}>
              Лента заказов
            </p>
          </div>
        </div>

        
        <div className={styles.center}>
          <Logo/>
        </div>

        <Link to={{ pathname: `/profile` }} className={styles.link}>
          <div className={`${styles.navigation__link} ${styles.push__right} pt-4 pb-4 pl-5 pr-5`}>
            <ProfileIcon type={isProfile ? "primary" : "secondary"} />
            <p className={isProfile ? mainTextColor : inactiveTextColor}>
              {isUserLoginSuccess ? userData.name : "Личный кабинет"}
            </p>
          </div>
        </Link>
      </nav>
    </header>
  ) 
}
