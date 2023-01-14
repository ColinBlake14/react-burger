import { AppDispatch, AppThunk } from "../..";
import { postOrder } from "../../utils/api";
import { TIngredientConstructor, TOrderIds } from "../../utils/types";

export const SET_BUN: 'SET_BUN' = 'SET_BUN';
export const DELETE_BUN: 'DELETE_BUN' = 'DELETE_BUN';
export const SET_INGREDIENT: 'SET_INGREDIENT' = 'SET_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const RESET_INGREDIENTS: 'RESET_INGREDIENTS' = 'RESET_INGREDIENTS';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export const GET_ORDER_NUM_REQUEST: 'GET_ORDER_NUM_REQUEST' = 'GET_ORDER_NUM_REQUEST';
export const GET_ORDER_NUM_SUCCESS: 'GET_ORDER_NUM_SUCCESS' = 'GET_ORDER_NUM_SUCCESS';
export const GET_ORDER_NUM_FAILED: 'GET_ORDER_NUM_FAILED' = 'GET_ORDER_NUM_FAILED';

export const RESET_MODAL_NUM_DATA: 'RESET_MODAL_DATA' = 'RESET_MODAL_DATA';

export interface ISetBunAction {
  readonly type: typeof SET_BUN;
  readonly bun: TIngredientConstructor;
}

export interface IDeleteBunAction {
  readonly type: typeof DELETE_BUN;
}

export interface ISetIngredientAction {
  readonly type: typeof SET_INGREDIENT;
  readonly ingredient: TIngredientConstructor;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly uuid: string;
}

export interface IResetIngredientsAction {
  readonly type: typeof RESET_INGREDIENTS;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly fromIndex: number;
  readonly toIndex: number;
}

export interface IGetOrderNumRequestAction {
  readonly type: typeof GET_ORDER_NUM_REQUEST;
}

export interface IGetOrderNumSuccessAction {
  readonly type: typeof GET_ORDER_NUM_SUCCESS;
  readonly orderNum: number;
}

export interface IGetOrderNumFailedAction {
  readonly type: typeof GET_ORDER_NUM_FAILED;
}

export interface IResetModalNumDataAction {
  readonly type: typeof RESET_MODAL_NUM_DATA;
}

export type TConstructorActions = 
  | ISetBunAction
  | IDeleteBunAction
  | ISetIngredientAction
  | IDeleteIngredientAction
  | IResetIngredientsAction
  | IMoveIngredientAction
  | IGetOrderNumRequestAction
  | IGetOrderNumSuccessAction
  | IGetOrderNumFailedAction
  | IResetModalNumDataAction
;

export const setBunAction = (bun: TIngredientConstructor): ISetBunAction => ({
  type: SET_BUN,
  bun
});

export const deleteBunAction = (): IDeleteBunAction => ({
  type: DELETE_BUN
});

export const setIngredientAction = (ingredient: TIngredientConstructor): ISetIngredientAction => ({
  type: SET_INGREDIENT,
  ingredient
});

export const deleteIngredientAction = (uuid: string): IDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  uuid
});

export const resetIngredientsAction = (): IResetIngredientsAction => ({
  type: RESET_INGREDIENTS
});

export const moveIngredientAction = (fromIndex: number, toIndex: number): IMoveIngredientAction => ({
  type: MOVE_INGREDIENT,
  fromIndex,
  toIndex
});

export const getOrderNumRequestAction = (): IGetOrderNumRequestAction => ({
  type: GET_ORDER_NUM_REQUEST
});

export const getOrderNumSuccessAction = (orderNum: number): IGetOrderNumSuccessAction => ({
  type: GET_ORDER_NUM_SUCCESS,
  orderNum
});

export const getOrderNumFailedAction = (): IGetOrderNumFailedAction => ({
  type: GET_ORDER_NUM_FAILED
});

export const resetModalNumDataAction = (): IResetModalNumDataAction => ({
  type: RESET_MODAL_NUM_DATA
});

export const getOrderNum: AppThunk = (orderIds: TOrderIds) => (dispatch: AppDispatch) => {
  dispatch(getOrderNumRequestAction());
  postOrder(orderIds).then(res => {
    if (res) {
      dispatch(getOrderNumSuccessAction(res.order.number));
    } else {
      dispatch(getOrderNumFailedAction());
    }
  }).catch( err => {
      dispatch(getOrderNumFailedAction());
    });
}
