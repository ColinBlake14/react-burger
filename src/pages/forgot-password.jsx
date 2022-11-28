import React from "react";
import styles from './pages.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = React.useState('');

  return (
    <div className={styles.container}>
      <div className={styles.title__container}>
        <p className="text text_type_main-medium">
          Восстановление пароля
        </p>
      </div>

      <form className={styles.form__container}>
        <EmailInput
          placeholder="Укажите e-mail"
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          isIcon={false}
          extraClass="mt-6 mb-6"
        />

        <div className={styles.forgot__password__button__container}>
          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </div>
      </form>

      <div className={`${styles.text__container} mb-4`}>
        <p className="text text_type_main-default text_color_inactive">
          Всполмнили пароль?
        </p>
        <Link to={{ pathname: `/login` }}>
          <p className={`${styles.link} text text_type_main-default`}>
            Войти
          </p>
        </Link>
      </div>
    </div>
  )
}
