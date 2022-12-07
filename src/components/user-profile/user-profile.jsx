import React from "react";
import styles from './user-profile.module.css';
import { Link, useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { UserProfileData } from "./user-profile-data/user-profile-data";
import { UserProfileOrders } from "./user-profile-orders/user-profile-orders";
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUserRequest } from "../../services/actions/register-login-user";

export const UserProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();

  const isOrders = !!useRouteMatch(`${path}/orders`);
  const isProfile = !isOrders;

  const mainTextColor = "text text_type_main-medium";
  const inactiveTextColor = "text text_type_main-medium text_color_inactive";
  
  const onLogoutClick = () => {
    dispatch(logoutUserRequest());
    history.replace({ pathname: '/login' });
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.tabs__container} mr-15`}>
        <Link to={{ pathname: `/profile` }} className={styles.link}>
          <div className={styles.tab}>
            <p className={isProfile ? mainTextColor : inactiveTextColor}>
              Профиль
            </p>
          </div>
        </Link>

        <Link to={{ pathname: `${url}/orders` }} className={styles.link}>
          <div className={styles.tab}>
            <p className={isOrders ? mainTextColor : inactiveTextColor}>
              История заказов
            </p>
          </div>
        </Link>

        <div className={`${styles.tab} ${styles.link}`} onClick={onLogoutClick}>
          <p className={inactiveTextColor}>
            Выход
          </p>
        </div>

        <div className={`${styles.tab__text} mt-20`}>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </div>

      <Switch>
        <Route path={`${path}/orders`}>
          <UserProfileOrders/>
        </Route>
        <Route path={path} exact={true}>
          <UserProfileData/>
        </Route>
      </Switch>
         
    </div>
  )
}
