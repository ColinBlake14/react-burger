import { AppDispatch, AppThunk } from "../..";
import { registerUser } from "../../utils/api";
import { loginUser, deleteToken, getUser } from "../../utils/api";
import { setCookie } from "../../utils/cookies";
import { TUserData, TUserLogin } from "../../utils/types";

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_FAILED' = 'LOGOUT_USER_FAILED';

export const AUTH_USER_REQUEST: 'AUTH_USER_REQUEST' = 'AUTH_USER_REQUEST';
export const AUTH_USER_SUCCESS: 'AUTH_USER_SUCCESS' = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILED: 'AUTH_USER_FAILED' = 'AUTH_USER_FAILED';

export const SET_USER_DATA: 'SET_USER_DATA' = 'SET_USER_DATA';

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  user: TUserLogin;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  user: TUserLogin;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}

export interface IAuthUserRequestAction {
  readonly type: typeof AUTH_USER_REQUEST;
}

export interface IAuthUserSuccessAction {
  readonly type: typeof AUTH_USER_SUCCESS;
  user: TUserLogin;
}

export interface IAuthUserFailedAction {
  readonly type: typeof AUTH_USER_FAILED;
}

export interface ISetUserDataAction {
  readonly type: typeof SET_USER_DATA;
  user: TUserLogin;
}

export type TRegisterLoginUserActions = 
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | ILogoutUserRequestAction
  | ILogoutUserSuccessAction
  | ILogoutUserFailedAction
  | IAuthUserRequestAction
  | IAuthUserSuccessAction
  | IAuthUserFailedAction
  | ISetUserDataAction
;

export const registerUserRequestAction = (): IRegisterUserRequestAction => ({
  type: REGISTER_USER_REQUEST
});

export const registerUserSuccessAction = (user: TUserLogin): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  user
});

export const registerUserFailedAction = (): IRegisterUserFailedAction => ({
  type: REGISTER_USER_FAILED
});

export const loginUserRequestAction = (): ILoginUserRequestAction => ({
  type: LOGIN_USER_REQUEST
});

export const loginUserSuccessAction = (user: TUserLogin): ILoginUserSuccessAction => ({
  type: LOGIN_USER_SUCCESS,
  user
});

export const loginUserFailedAction = (): ILoginUserFailedAction => ({
  type: LOGIN_USER_FAILED
});

export const logoutUserRequestAction = (): ILogoutUserRequestAction => ({
  type: LOGOUT_USER_REQUEST
});

export const logoutUserSuccessAction = (): ILogoutUserSuccessAction => ({
  type: LOGOUT_USER_SUCCESS
});

export const logoutUserFailedAction = (): ILogoutUserFailedAction => ({
  type: LOGOUT_USER_FAILED
});

export const authUserRequestAction = (): IAuthUserRequestAction => ({
  type: AUTH_USER_REQUEST
});

export const authUserSuccessAction = (user: TUserLogin): IAuthUserSuccessAction => ({
  type: AUTH_USER_SUCCESS,
  user
});

export const authUserFailedAction = (): IAuthUserFailedAction => ({
  type: AUTH_USER_FAILED
});

export const seyUserDataAction = (user: TUserLogin): ISetUserDataAction => ({
  type: SET_USER_DATA,
  user
});

export const registerUserRequest: AppThunk = (user: TUserData) => (dispatch: AppDispatch) => {
  dispatch(registerUserRequestAction());
  registerUser(user).then(res => {
    if (res) {
      let accessToken = res.accessToken.split('Bearer ')[1];

      if (accessToken) {
        setCookie('accessToken', accessToken);
      }
      
      localStorage.setItem('refreshToken', res.refreshToken);

      dispatch(registerUserSuccessAction(res.user));
    } else {
      dispatch(registerUserFailedAction());
    }
  }).catch( err => {
      dispatch(registerUserFailedAction());
    });
}

export const loginUserRequest: AppThunk = (user: TUserLogin) => (dispatch: AppDispatch) => {
  dispatch(loginUserRequestAction());
  loginUser(user).then(res => {
    if (res) {
      let accessToken = res.accessToken.split('Bearer ')[1];

      if (accessToken) {
        setCookie('accessToken', accessToken);
      }
      
      localStorage.setItem('refreshToken', res.refreshToken);

      dispatch(loginUserSuccessAction(res.user));
    } else {
      dispatch(loginUserFailedAction());
    }
  }).catch( err => {
      dispatch(loginUserFailedAction());
    });
}

export const logoutUserRequest: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(logoutUserRequestAction());
  deleteToken().then(res => {
    if (res) {
      setCookie('accessToken', '');
      localStorage.setItem('refreshToken', '');

      dispatch(logoutUserSuccessAction());
    } else {
      dispatch(logoutUserFailedAction());
    }
  }).catch( err => {
      dispatch(logoutUserFailedAction());
    });
}

export const authUserRequest: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(authUserRequestAction());
  getUser().then(res => {
    if (res) {
      dispatch(authUserSuccessAction(res.user));
    } else {
      dispatch(authUserFailedAction());
    }
  }).catch( err => {
      dispatch(authUserFailedAction());
    });
}
