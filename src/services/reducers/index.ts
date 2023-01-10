import { combineReducers } from 'redux';
import { ingredientsReducer } from "./burger-ingredients";
import { bconstructorReducer } from './burger-constructor';
import { registerLoginUserReducer } from './register-login-user';
import { forgotResetPassReducer } from './forgot-reset-pass';
import { TIngredientsActions } from '../actions/burger-ingredients';
import { TConstructorActions } from '../actions/burger-constructor';
import { TRegisterLoginUserActions } from '../actions/register-login-user';
import { TForgotResetPassActions } from '../actions/forgot-reset-pass';
import { wsReducer } from './ws-reducer';
import { TWsActions } from '../actions/ws-actions';

export type TApplicationActions = TIngredientsActions | TConstructorActions | TRegisterLoginUserActions | TForgotResetPassActions | TWsActions;

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  bconstructor: bconstructorReducer,
  registerLoginUser: registerLoginUserReducer,
  forgotResetPass: forgotResetPassReducer,
  wsData: wsReducer
});
