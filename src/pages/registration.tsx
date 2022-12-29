import React from "react";
import styles from './pages.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { registerUserRequest } from '../services/actions/register-login-user';
import { useAppDispatch, useAppSelector } from "../utils/hooks";

export const Registration = () => {
  const dispatch = useAppDispatch();

  const registrationError = useAppSelector(store => store.registerLoginUser.registrationError);

  const [nameValue, setNameValue] = React.useState<string>('');
  const [emailValue, setEmailValue] = React.useState<string>('');
  const [passValue, setPassValue] = React.useState<string>('');

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const userData = {
      email: emailValue,
      password: passValue,
      name: nameValue
    }
    dispatch(registerUserRequest(userData));
    setNameValue('');
    setEmailValue('');
    setPassValue('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title__container}>
        <p className="text text_type_main-medium">
          Регистрация
        </p>
      </div>

      <form onSubmit={submit} className={styles.form__container}>
        <Input
          type={'text'}
          placeholder="Имя"
          onChange={e => setNameValue(e.target.value)}
          value={nameValue}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6 mb-6"
        />

        <EmailInput
          placeholder="Email"
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={e => setPassValue(e.target.value)}
          value={passValue}
          name={'password'}
          extraClass="mb-6"
        />

        <div className={styles.register__button__container}>
          <Button htmlType="submit" type="primary" size="large">
            Зарегистрироваться
          </Button>
        </div>

        {registrationError && (<p className={`${styles.error__text} text text_type_main-default text_color_inactive mt-6`}>
          Ошибка регистрации. Введите корректные данные.
        </p>)}
      </form>

      <div className={`${styles.text__container} mb-4`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
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
