import { postOrder } from "../../utils/api";

export const SET_BUN = 'SET_BUN';
export const DELETE_BUN = 'DELETE_BUN';
export const SET_INGREDIENT = 'SET_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const GET_ORDER_NUM_REQUEST = 'GET_ORDER_NUM_REQUEST';
export const GET_ORDER_NUM_SUCCESS = 'GET_ORDER_NUM_SUCCESS';
export const GET_ORDER_NUM_FAILED = 'GET_ORDER_NUM_FAILED';

export const RESET_MODAL_NUM_DATA = 'RESET_MODAL_DATA';


export function getOrderNum(orderIds) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_NUM_REQUEST
    });
    postOrder(orderIds).then(res => {
      if (res) {
        dispatch({
          type: GET_ORDER_NUM_SUCCESS,
          orderNum: res.order.number
        });
      } else {
        dispatch({
          type: GET_ORDER_NUM_FAILED
        });
      }
    }).catch( err => {
        dispatch({
          type: GET_ORDER_NUM_FAILED
        });
      });
  };
}
