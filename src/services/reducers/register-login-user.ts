import { TUserLogin } from "../../utils/types";
import { 
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  SET_USER_DATA,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILED,
  TRegisterLoginUserActions
} from "../actions/register-login-user";

export type TRegisterLoginUserState = {
  user: TUserLogin | null,
  registrationRequest: boolean,
  registrationError: boolean,
  loginRequest: boolean,
  loginSuccess: boolean,
  loginError: boolean,
  logoutRequest: boolean,
  logoutError: boolean,
  authRequest: boolean,
  authChecked: boolean
}

export const initialState: TRegisterLoginUserState = {
  user: null,
  registrationRequest: false,
  registrationError: false,
  loginRequest: false,
  loginSuccess: false,
  loginError: false,
  logoutRequest: false,
  logoutError: false,
  authRequest: false,
  authChecked: false
}

export const registerLoginUserReducer = (state = initialState, action: TRegisterLoginUserActions) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registrationRequest: true
      };
    }
    case REGISTER_USER_SUCCESS: {
      return { 
        ...state, 
        registrationError: false,
        user: action.user,
        registrationRequest: false,
        loginSuccess: true
      };
    }
    case REGISTER_USER_FAILED: {
      return { 
        ...initialState,
        registrationError: true
      };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginSuccess: false
      };
    }
    case LOGIN_USER_SUCCESS: {
      return { 
        ...state, 
        loginError: false,
        loginSuccess: true,
        user: action.user,
        loginRequest: false
      };
    }
    case LOGIN_USER_FAILED: {
      return { 
        ...initialState,
        loginRequest: false,
        loginError: true,
        authChecked: true
      };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return { 
        ...state, 
        logoutError: false,
        loginSuccess: false,
        user: null,
        logoutRequest: false
      };
    }
    case LOGOUT_USER_FAILED: {
      return { 
        ...state,
        logoutRequest: false,
        logoutError: true
      };
    }
    case SET_USER_DATA: {
      return { 
        ...state,
        user: action.user
      };
    }
    case AUTH_USER_REQUEST: {
      return {
        ...state,
        user: null,
        loginSuccess: false,
        authRequest: true,
        authChecked: false
      };
    }
    case AUTH_USER_SUCCESS: {
      return { 
        ...state, 
        authRequest: false,
        loginSuccess: true,
        authChecked: true,
        user: action.user
      };
    }
    case AUTH_USER_FAILED: {
      return { 
        ...initialState,
        authChecked: true
      };
    }
    default: {
      return state;
    }
  }
};
