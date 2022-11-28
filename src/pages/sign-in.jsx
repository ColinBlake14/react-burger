import React from "react";
import styles from './pages.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';

export const SignIn = () => {
  const [emailValue, setEmailValue] = React.useState('');
  const [passValue, setPassValue] = React.useState('');

  return (
    <div className={styles.container}>
      <div className={styles.title__container}>
        <p className="text text_type_main-medium">
          Вход
        </p>
      </div>

      <form className={styles.form__container}>
        <EmailInput
          placeholder="Email"
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          isIcon={false}
          extraClass="mt-6 mb-6"
        />

        <PasswordInput
          onChange={e => setPassValue(e.target.value)}
          value={passValue}
          name={'password'}
          extraClass="mb-6"
        />

        <div className={styles.login__button__container}>
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </div>
      </form>

      <div className={`${styles.text__container} mb-4`}>
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?
        </p>
        <Link to={{ pathname: `/register` }}>
          <p className={`${styles.link} text text_type_main-default`}>
            Зарегистрироваться
          </p>
        </Link>
      </div>

      <div className={styles.text__container}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Link to={{ pathname: `/forgot-password` }}>
          <p className={`${styles.link} text text_type_main-default`}>
            Восстановить пароль
          </p>
        </Link>
      </div>
    </div>
  )
}
