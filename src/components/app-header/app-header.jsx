import React from "react";
import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
  return (
    <header>
      <nav className={`${styles.header} pt-4 pb-4`}>
        <div className={`${styles.navigation__link} ${styles.push__left}`}>
          <div className={`${styles.navigation__link} pt-4 pb-4 pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">
              Конструктор
            </p>
          </div>

          <div className={`${styles.navigation__link} text_color_inactive pt-4 pb-4 pl-5 pr-5 ml-2`}>
          <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2">
              Лента заказов
            </p>
          </div>
        </div>

        <div className={styles.center}>
          <Logo/>
        </div>

        <div className={`${styles.navigation__link} ${styles.push__right} text_color_inactive pt-4 pb-4 pl-5 pr-5`}>
        <ProfileIcon type="secondary" />
          <p className="text text_type_main-default ml-2">
            Личный кабинет
          </p>
        </div>
      </nav>
    </header>
  ) 
}