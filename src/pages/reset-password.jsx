import React from "react";
import styles from './pages.module.css';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';

export const ResetPassword = () => {
  const [codeValue, setCodeValue] = React.useState('');
  const [passValue, setPassValue] = React.useState('');

  return (
    <div className={styles.container}>
      <div className={styles.title__container}>
        <p className="text text_type_main-medium">
          Восстановление пароля
        </p>
      </div>

      <form className={styles.form__container}>
        <PasswordInput
          placeholder="Введите новый пароль"
          onChange={e => setPassValue(e.target.value)}
          value={passValue}
          name={'password'}
          extraClass="mt-6 mb-6"
        />

        <Input
          type={'text'}
          placeholder="Введите код из письма"
          onChange={e => setCodeValue(e.target.value)}
          value={codeValue}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />

        <div className={styles.reset__password__button__container}>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </form>

      <div className={`${styles.text__container} mb-4`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
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
