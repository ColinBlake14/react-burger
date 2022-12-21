import React, { useEffect } from "react";
import styles from './pages.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordRequest } from "../services/actions/forgot-reset-pass";
import { useHistory } from 'react-router-dom'; 
import { TRootState } from "../services/reducers";
import { AnyAction } from "redux";

export const ForgotPassword = () => {
  const history = useHistory(); 
  const dispatch = useDispatch();

  const {forgotPasswordSuccess, forgotPasswordError} = useSelector((store: TRootState) => store.forgotResetPass);

  const [emailValue, setEmailValue] = React.useState<string>('');

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const userEmail = {
      email: emailValue
    }
    dispatch(forgotPasswordRequest(userEmail) as unknown as AnyAction);
    setEmailValue('');
  };

  useEffect (() => {
    if (forgotPasswordSuccess) {
      history.replace({ pathname: '/reset-password' });
    }
  }, [forgotPasswordSuccess, history]);

  return (
    <div className={styles.container}>
      <div className={styles.title__container}>
        <p className="text text_type_main-medium">
          Восстановление пароля
        </p>
      </div>

      <form onSubmit={submit} className={styles.form__container}>
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

        {forgotPasswordError && (<p className={`${styles.error__text} text text_type_main-default text_color_inactive mt-6`}>
          Введите корректный E-mail адрес.
        </p>)}
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
