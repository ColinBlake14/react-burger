import { 
  INCREASE_ITEM,
  DECREASE_ITEM,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  RESET_BUNS_COUNT,
  RESET_INGREDIENTS_COUNT,
  SET_MODAL_DATA,
  RESET_MODAL_DATA,
  SET_CURRENT_TAB
 } from "../actions/burger-ingredients";

 const initialState = {
  items: [],
  hasError: false,
  isLoading: false,
  hasData: false,
  isModalVisible: false,
  modalData: null,
  currentTab: 'one'
 }

 export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasData: false
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { 
        ...state, 
        hasError: false, 
        items: action.items, 
        isLoading: false,
        hasData: true
      };
    }
    case GET_ITEMS_FAILED: {
      return { 
        ...initialState, 
        hasError: true
      };
    }
    case RESET_BUNS_COUNT: {
      return { 
        ...state, 
        items: [...state.items].map(item => {
          if (item.type === "bun") {
            return { ...item, __v: 0 };
          }
          return item;
        })
      };
    }
    case INCREASE_ITEM: {
      return {
        ...state,
        items: [...state.items].map(item =>
          item._id === action._id ? { ...item, __v: ++item.__v } : item
        )
      };
    }
    case DECREASE_ITEM: {
      return {
        ...state,
        items: [...state.items].map(item =>
          item._id === action._id ? { ...item, __v: --item.__v } : item
        )
      };
    }
    case RESET_INGREDIENTS_COUNT: {
      return {
        ...state,
        items: [...state.items].map(item => {
          return { ...item, __v: 0 };
        })
      };
    }
    case SET_MODAL_DATA: {
      return {
        ...state,
        isModalVisible: true,
        modalData: action.modalItem
      };
    }
    case RESET_MODAL_DATA: {
      return {
        ...state,
        isModalVisible: false,
        modalData: null
      };
    }
    case SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.tab
      };
    }
    default: {
      return state;
    }
  }
};
