import { TIngredientConstructor } from "../../utils/types";
import { 
  SET_BUN, 
  DELETE_BUN, 
  SET_INGREDIENT, 
  DELETE_INGREDIENT,
  RESET_INGREDIENTS,
  GET_ORDER_NUM_REQUEST,
  GET_ORDER_NUM_SUCCESS,
  GET_ORDER_NUM_FAILED,
  RESET_MODAL_NUM_DATA,
  MOVE_INGREDIENT,
  TConstructorActions
} from "../actions/burger-constructor";

export type TBurgerConstructorState = {
  bun: TIngredientConstructor | null,
  ingredients: ReadonlyArray<TIngredientConstructor>,
  orderNum: number,
  isModalVisible: boolean,
  hasError: boolean, 
  isLoading: boolean,
  hasData: boolean
}

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
  orderNum: 0,
  isModalVisible: false,
  hasError: false, 
  isLoading: false,
  hasData: false
 }

 export const bconstructorReducer = (state = initialState, action: TConstructorActions) => {
  switch (action.type) {
    case SET_BUN: {
      return {
        ...state,
        bun: action.bun
      };
    }
    case DELETE_BUN: {
      return {
        ...state,
        bun: null
      };
    }
    case SET_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient ]
      };
    }
    case MOVE_INGREDIENT: {
      let oldIngredients = [...state.ingredients];
      oldIngredients.splice(action.toIndex, 0, oldIngredients.splice(action.fromIndex, 1)[0])

      return {
        ...state,
        ingredients: oldIngredients
      };
    }
    case DELETE_INGREDIENT: {
      if (state.ingredients.length === 1) {
        return {
          ...state,
          ingredients: []
        };
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients].filter(item => item.uuid !== action.uuid)
        };
      }
    }
    case RESET_INGREDIENTS: {
      return initialState;
    }
    case GET_ORDER_NUM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasData: false,
        isModalVisible: true
      };
    }
    case GET_ORDER_NUM_SUCCESS: {
      return { 
        ...state, 
        hasError: false, 
        orderNum: action.orderNum, 
        isLoading: false,
        hasData: true
      };
    }
    case GET_ORDER_NUM_FAILED: {
      return { 
        ...initialState, 
        hasError: true
      };
    }
    case RESET_MODAL_NUM_DATA: {
      return { 
        ...state, 
        isModalVisible: false,
        orderNum: 0
      };
    }
    default: {
      return state;
    }
  }
};
