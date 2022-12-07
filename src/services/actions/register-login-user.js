import { registerUser } from "../../utils/api";
import { loginUser, deleteToken, getUser } from "../../utils/api";
import { setCookie } from "../../utils/cookies";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILED = 'AUTH_USER_FAILED';

export const SET_USER_DATA = 'SET_USER_DATA';

export function registerUserRequest(user) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    registerUser(user).then(res => {
      if (res) {
        let accessToken = res.accessToken.split('Bearer ')[1];

        if (accessToken) {
          setCookie('accessToken', accessToken);
        }
        
        localStorage.setItem('refreshToken', res.refreshToken);

        dispatch({
          type: REGISTER_USER_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: REGISTER_USER_FAILED
        });
      }
    }).catch( err => {
        dispatch({
          type: REGISTER_USER_FAILED
        });
      });
  };
}

export function loginUserRequest(user) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST
    });
    loginUser(user).then(res => {
      if (res) {
        let accessToken = res.accessToken.split('Bearer ')[1];

        if (accessToken) {
          setCookie('accessToken', accessToken);
        }
        
        localStorage.setItem('refreshToken', res.refreshToken);

        dispatch({
          type: LOGIN_USER_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: LOGIN_USER_FAILED
        });
      }
    }).catch( err => {
        dispatch({
          type: LOGIN_USER_FAILED
        });
      });
  };
}

export function logoutUserRequest() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST
    });
    deleteToken().then(res => {
      if (res) {
        setCookie('accessToken', '');
        localStorage.setItem('refreshToken', '');

        dispatch({
          type: LOGOUT_USER_SUCCESS
        });
      } else {
        dispatch({
          type: LOGOUT_USER_FAILED
        });
      }
    }).catch( err => {
        dispatch({
          type: LOGOUT_USER_FAILED
        });
      });
  };
}

export function authUserRequest(user) {
  return function(dispatch) {
    dispatch({
      type: AUTH_USER_REQUEST
    });
    getUser().then(res => {
      if (res) {
        dispatch({
          type: AUTH_USER_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: AUTH_USER_FAILED
        });
      }
    }).catch( err => {
        dispatch({
          type: AUTH_USER_FAILED
        });
      });
  };
}
