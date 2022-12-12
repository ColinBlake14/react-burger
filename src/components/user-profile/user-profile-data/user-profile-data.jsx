import React, { useEffect } from "react";
import styles from './user-profile-data.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUser } from "../../../utils/api";
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_DATA, authUserRequest } from "../../../services/actions/register-login-user";

export const UserProfileData = () => {
  const dispatch = useDispatch();

  const isUserLoginSuccess = useSelector(store => store.registerLoginUser.loginSuccess);
  const userStoreData = useSelector(store => store.registerLoginUser.user);

  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passValue, setPassValue] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [userDefaultData, setUserDefaultData] = React.useState(null);
  const [buttonsVisible, setButtonsVisible] = React.useState(false);

  const inputRef = React.useRef(null)

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current.focus(), 0);
  }

  useEffect(() => {
    if (!isUserLoginSuccess) {
      dispatch(authUserRequest());
    } else {
      setUserDefaultData({
        name: userStoreData.name,
        email: userStoreData.email,
        pass: ''
      });
      setNameValue(userStoreData.name);
      setEmailValue(userStoreData.email);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userDefaultData) {
      if (nameValue !== userDefaultData.name || emailValue !== userDefaultData.email || passValue !== userDefaultData.pass) {
        setButtonsVisible(true);
      } else {
        setButtonsVisible(false);
      }
    }
  }, [nameValue, emailValue, passValue, userDefaultData]);
  
  const submit = e => {
    e.preventDefault();
    let newUserData = {};
    if (emailValue !== userDefaultData.email) {
      newUserData = {
        email: emailValue
      }
    }
    if (nameValue !== userDefaultData.name) {
      newUserData = {
        ...newUserData,
        name: nameValue
      }
    }
    if (newUserData) {
        patchUser(newUserData).then(res => {
          let user = res.user;
          setUserDefaultData({
            name: user.name,
            email: user.email,
            pass: ''
          });
          setNameValue(user.name);
          setEmailValue(user.email);
          
          dispatch({ type: SET_USER_DATA, user: user });
      }).catch(err => {
        console.log(err);
      })
    }
  };

  const cancel = e => {
    e.preventDefault();
    setNameValue(userDefaultData.name);
    setEmailValue(userDefaultData.email);
    setPassValue(userDefaultData.pass);
  };

  return (
    <div className={styles.data__fields__container}>
      <form onSubmit={submit}>
        <Input
          type={'text'}
          placeholder="Имя"
          onChange={e => setNameValue(e.target.value)}
          onBlur={e => setDisabled(true)}
          value={nameValue}
          name={'name'}
          errorText={'Ошибка'}
          size={'default'}
          icon="EditIcon"
          disabled={disabled}
          ref={inputRef}
          onIconClick={onIconClick}
          extraClass="mb-6"
        />

        <EmailInput
          placeholder="Логин"
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          isIcon={true}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={e => setPassValue(e.target.value)}
          value={passValue}
          name={'password'}
          icon="EditIcon"
          extraClass="mb-6"
        />

        {buttonsVisible && 
        (<div className={styles.buttons__container}>
          <Button htmlType="button" type="secondary" size="medium" onClick={cancel}>
            Отмена
          </Button>
          <div className={styles.button__container}>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </div>)}
      </form>
    </div>
  ) 
}
