import { AppDispatch, AppThunk } from "../..";
import { getIngredients } from "../../utils/api";
import { TIngredient } from "../../utils/types";

export const INCREASE_ITEM: 'INCREASE_ITEM' = 'INCREASE_ITEM';
export const DECREASE_ITEM: 'DECREASE_ITEM' = 'DECREASE_ITEM';
export const RESET_BUNS_COUNT: 'RESET_BUNS_COUNT' = 'RESET_BUNS_COUNT';
export const RESET_INGREDIENTS_COUNT: 'RESET_INGREDIENTS_COUNT' = 'RESET_INGREDIENTS_COUNT';

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export const SET_CURRENT_TAB: 'SET_CURRENT_TAB' = 'SET_CURRENT_TAB';

export interface IIncreaseItemAction {
  readonly type: typeof INCREASE_ITEM;
  readonly _id: string;
}

export interface IDecreaseItemAction {
  readonly type: typeof DECREASE_ITEM;
  readonly _id: string;
}

export interface IResetBunsCountAction {
  readonly type: typeof RESET_BUNS_COUNT;
}

export interface IResetIngredientsCountAction {
  readonly type: typeof RESET_INGREDIENTS_COUNT;
}

export interface IGetItemsAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
}

export interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: ReadonlyArray<TIngredient>;
}

export interface ISetCurrentTabAction {
  readonly type: typeof SET_CURRENT_TAB;
  readonly tab: string;
}

export type TIngredientsActions = 
  | IIncreaseItemAction
  | IDecreaseItemAction
  | IResetBunsCountAction
  | IResetIngredientsCountAction
  | IGetItemsAction
  | IGetItemsFailedAction
  | IGetItemsSuccessAction
  | ISetCurrentTabAction
;

export const increaseItemAction = (_id: string): IIncreaseItemAction => ({
  type: INCREASE_ITEM,
  _id
});

export const decreaseItemAction = (_id: string): IDecreaseItemAction => ({
  type: DECREASE_ITEM,
  _id
});

export const resetBunsCountAction = (): IResetBunsCountAction => ({
  type: RESET_BUNS_COUNT
});

export const resetIngredientsCountAction = (): IResetIngredientsCountAction => ({
  type: RESET_INGREDIENTS_COUNT
});

export const getItemsAction = (): IGetItemsAction => ({
  type: GET_ITEMS_REQUEST
});

export const getItemsFailedAction = (): IGetItemsFailedAction => ({
  type: GET_ITEMS_FAILED
});

export const getItemsSuccessAction = (items: ReadonlyArray<TIngredient>): IGetItemsSuccessAction => ({
  type: GET_ITEMS_SUCCESS,
  items
});

export const setCurrentTabAction = (tab: string): ISetCurrentTabAction => ({
  type: SET_CURRENT_TAB,
  tab
});

export const getItems: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getItemsAction());
  getIngredients().then(res => {
    if (res) {
      dispatch(getItemsSuccessAction(res));
    } else {
      dispatch(getItemsFailedAction());
    }
  }).catch( err => {
    dispatch(getItemsFailedAction());
    });
};
