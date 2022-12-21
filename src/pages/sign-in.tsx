import React from "react";
import styles from './pages.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserRequest } from "../services/actions/register-login-user";
import { Redirect, useLocation } from 'react-router-dom';
import { TRootState } from "../services/reducers";
import { AnyAction } from "redux";
import * as H from 'history';

export const SignIn = () => {
  const dispatch = useDispatch();
  let location = useLocation<{ from: H.Location }>();
  let { from } = location.state || { from: { pathname: "/" } };

  const { loginSuccess, loginError } = useSelector((store: TRootState) => store.registerLoginUser);

  const [emailValue, setEmailValue] = React.useState<string>('');
  const [passValue, setPassValue] = React.useState<string>('');

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const userData = {
      email: emailValue,
      password: passValue
    }
    dispatch(loginUserRequest(userData) as unknown as AnyAction);
    setEmailValue('');
    setPassValue('');
  };

  if (loginSuccess) {
    return (
      <Redirect
        to = {{ pathname: from.pathname }}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title__container}>
        <p className="text text_type_main-medium">
          Вход
        </p>
      </div>

      <form onSubmit={submit} className={styles.form__container}>
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

        {loginError && (<p className={`${styles.error__text} text text_type_main-default text_color_inactive mt-6`}>
          Ошибка авторизации. Введите корректные данные.
        </p>)}
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
