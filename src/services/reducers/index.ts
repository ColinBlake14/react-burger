import { combineReducers } from 'redux';
import { ingredientsReducer } from "./burger-ingredients";
import { bconstructorReducer } from './burger-constructor';
import { registerLoginUserReducer } from './register-login-user';
import { forgotResetPassReducer } from './forgot-reset-pass';

export type TRootState = {
  ingredients: ReturnType<typeof ingredientsReducer>,
  bconstructor: ReturnType<typeof bconstructorReducer>,
  registerLoginUser: ReturnType<typeof registerLoginUserReducer>,
  forgotResetPass: ReturnType<typeof forgotResetPassReducer>
};

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  bconstructor: bconstructorReducer,
  registerLoginUser: registerLoginUserReducer,
  forgotResetPass: forgotResetPassReducer
});
