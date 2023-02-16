import { AnyAction } from "redux";
import { TIngredientConstructor } from "../../utils/types";
import { deleteBunAction, deleteIngredientAction, getOrderNumFailedAction, getOrderNumRequestAction, getOrderNumSuccessAction, moveIngredientAction, resetIngredientsAction, resetModalNumDataAction, setBunAction, setIngredientAction } from "../actions/burger-constructor";
import { bconstructorReducer, initialState} from "./burger-constructor";

describe('burger-constructor reducer', () => {
  const testBunData: TIngredientConstructor = {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    uuid: "ssdf32sd9gsn23k24b235b235j235l"
  }

  const testIngredientData: TIngredientConstructor = {
    _id: "60666c42cc7b410027a1a9b5",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    uuid: "js123sdsdg3asdgfsgsgs2t3ssj2agl"
  }

  const testIngredientData2: TIngredientConstructor = {
    _id: "60666c42cc7b410027a1a9b7",
    name: "Соус Spicy-X",
    type: "sauce",
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    uuid: "ijsdn3sdf9sd8fh4kih;44j3j34itgj"
 }

  it('should return the initial state', () => {
    expect(bconstructorReducer(undefined, {} as unknown as AnyAction)).toEqual(initialState);
  });

  it("should handle set bun action", () => {
    const result = bconstructorReducer(initialState, setBunAction(testBunData));

    expect(result).toEqual({
      ...initialState,
      bun: testBunData
    });
  });

  it("should handle delete bun action", () => {
    const result = bconstructorReducer({...initialState, bun: testBunData}, deleteBunAction());

    expect(result).toEqual({
      ...initialState
    });
  });

  it("should handle set ingredient action", () => {
    const result = bconstructorReducer(initialState, setIngredientAction(testIngredientData));

    expect(result).toEqual({
      ...initialState,
      ingredients: [
        testIngredientData
      ]
    });
  });

  it("should handle move ingredient action", () => {
    const result = bconstructorReducer({...initialState, ingredients: [testIngredientData, testIngredientData2]},
       moveIngredientAction(0, 1));

    expect(result).toEqual({
      ...initialState,
      ingredients: [
        testIngredientData2,
        testIngredientData
      ]
    });
  });

  it("should handle delete ingredient action", () => {
    const result = bconstructorReducer({...initialState, ingredients: [testIngredientData, testIngredientData2]}, 
      deleteIngredientAction(testIngredientData.uuid));

    expect(result).toEqual({
      ...initialState,
      ingredients: [
        testIngredientData2
      ]
    });
  });

  it("should handle reset ingredients action", () => {
    const result = bconstructorReducer({...initialState, ingredients: [testIngredientData, testIngredientData2]}, 
      resetIngredientsAction());

    expect(result).toEqual({
      ...initialState
    });
  });

  it("should handle get order num request", () => {
    const result = bconstructorReducer(initialState, getOrderNumRequestAction());

    expect(result).toEqual({
      ...initialState,
      isLoading: true,
      hasData: false,
      isModalVisible: true
    });
  });

  it("should handle get order num success", () => {
    const result = bconstructorReducer(initialState, getOrderNumSuccessAction(35163));

    expect(result).toEqual({
      ...initialState,
      hasError: false, 
      orderNum: 35163, 
      isLoading: false,
      hasData: true
    });
  });

  it("should handle get order num failed", () => {
    const result = bconstructorReducer(initialState, getOrderNumFailedAction());

    expect(result).toEqual({
      ...initialState,
      hasError: true
    });
  });

  it("should handle reset modal num data", () => {
    const result = bconstructorReducer({...initialState, orderNum: 25223}, resetModalNumDataAction());

    expect(result).toEqual({
      ...initialState,
      isModalVisible: false,
      orderNum: 0
    });
  });
})
