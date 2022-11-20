import { combineReducers } from 'redux';
import { ingredientsReducer } from "./burger-ingredients";
import { bconstructorReducer } from './burger-constructor';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  bconstructor: bconstructorReducer,
});
