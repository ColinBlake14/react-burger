import { getIngredients } from "../../utils/api";

export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const RESET_BUNS_COUNT = 'RESET_BUNS_COUNT';
export const RESET_INGREDIENTS_COUNT = 'RESET_INGREDIENTS_COUNT';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getIngredients().then(res => {
      if (res) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      }
    }).catch( err => {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      });
  };
}
