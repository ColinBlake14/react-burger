import { combineReducers } from 'redux';
import { ingredientsReducer } from "./burger-ingredients";
import { bconstructorReducer } from './burger-constructor';
import { registerLoginUserReducer } from './register-login-user';
import { forgotResetPassReducer } from './forgot-reset-pass';

export type TRootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  bconstructor: bconstructorReducer,
  registerLoginUser: registerLoginUserReducer,
  forgotResetPass: forgotResetPassReducer
});
