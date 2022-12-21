import React, { useEffect } from "react";
import styles from './user-profile-data.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUser } from "../../../utils/api";
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_DATA, authUserRequest } from "../../../services/actions/register-login-user";
import { TRootState } from "../../../services/reducers";
import { TUserData } from "../../../utils/types";
import { AnyAction } from "redux";

export const UserProfileData = () => {
  const dispatch = useDispatch();

  const isUserLoginSuccess = useSelector((store: TRootState) => store.registerLoginUser.loginSuccess);
  const userStoreData = useSelector((store: TRootState) => store.registerLoginUser.user);

  const [nameValue, setNameValue] = React.useState<string>('');
  const [emailValue, setEmailValue] = React.useState<string>('');
  const [passValue, setPassValue] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [userDefaultData, setUserDefaultData] = React.useState<Partial<TUserData>>({});
  const [buttonsVisible, setButtonsVisible] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current!.focus(), 0);
  }

  useEffect(() => {
    if (!isUserLoginSuccess) {
      dispatch(authUserRequest() as unknown as AnyAction);
    } else {
      setUserDefaultData({
        name: userStoreData.name,
        email: userStoreData.email,
        password: ''
      });
      setNameValue(userStoreData.name);
      setEmailValue(userStoreData.email);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userDefaultData) {
      if (nameValue !== userDefaultData.name || emailValue !== userDefaultData.email || passValue !== userDefaultData.password) {
        setButtonsVisible(true);
      } else {
        setButtonsVisible(false);
      }
    }
  }, [nameValue, emailValue, passValue, userDefaultData]);
  
  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let newUserData: Partial<TUserData> = {};
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
            password: ''
          });
          setNameValue(user.name);
          setEmailValue(user.email);
          
          dispatch({ type: SET_USER_DATA, user: user });
      }).catch(err => {
        console.log(err);
      })
    }
  };

  const cancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setNameValue(userDefaultData.name!);
    setEmailValue(userDefaultData.email!);
    setPassValue(userDefaultData.password!);
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
