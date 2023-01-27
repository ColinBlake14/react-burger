import { AnyAction } from "redux";
import { 
  decreaseItemAction, 
  getItemsAction, 
  getItemsFailedAction, 
  getItemsSuccessAction, 
  increaseItemAction, 
  resetBunsCountAction, 
  resetIngredientsCountAction, 
  setCurrentTabAction
} from "../actions/burger-ingredients";
import { ingredientsReducer, initialState } from "./burger-ingredients";

describe('burger-ingredients reducer', () => {
  const testIngredientsData = [
    {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0
    },
    {
      _id: "60666c42cc7b410027a1a9b5",
      name: "Говяжий метеорит (отбивная)",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v: 0
    }
  ]

  const testIngredientsDataWithBunsCount = [
    {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 1
    },
    {
      _id: "60666c42cc7b410027a1a9b5",
      name: "Говяжий метеорит (отбивная)",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v: 0
    }
  ]

  const testIngredientsDataWithItemCount = [
    {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0
    },
    {
      _id: "60666c42cc7b410027a1a9b5",
      name: "Говяжий метеорит (отбивная)",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v: 1
    }
  ]

  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {} as unknown as AnyAction)).toEqual(initialState);
  });

  it("should handle get items request", () => {
    const result = ingredientsReducer(initialState, getItemsAction());

    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it("should handle get items success", () => {
    const result = ingredientsReducer(initialState, getItemsSuccessAction(testIngredientsData));

    expect(result).toEqual({
      ...initialState,
      items: testIngredientsData,
      hasData: true
    });
  });

  it("should handle get items failed", () => {
    const result = ingredientsReducer(initialState, getItemsFailedAction());

    expect(result).toEqual({
      ...initialState,
      hasError: true
    });
  });

  it("should handle reset buns count", () => {
    const result = ingredientsReducer({...initialState, items: testIngredientsDataWithBunsCount}, resetBunsCountAction());

    expect(result).toEqual({
      ...initialState,
      items: testIngredientsData
    });
  });

  it("should handle increase item", () => {
    const _id = "60666c42cc7b410027a1a9b5";
    const result = ingredientsReducer({...initialState, items: testIngredientsData}, increaseItemAction(_id));

    expect(result).toEqual({
      ...initialState,
      items: testIngredientsDataWithItemCount
    });
  });

  it("should handle decrease item", () => {
    const _id = "60666c42cc7b410027a1a9b5";
    const result = ingredientsReducer({...initialState, items: testIngredientsDataWithItemCount}, decreaseItemAction(_id));

    expect(result).toEqual({
      ...initialState,
      items: [
        {
          _id: "60666c42cc7b410027a1a9b1",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          __v: 0
        },
        {
          _id: "60666c42cc7b410027a1a9b5",
          name: "Говяжий метеорит (отбивная)",
          type: "main",
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: "https://code.s3.yandex.net/react/code/meat-04.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
          __v: 0
        }
      ]
    });
  });

  it("should handle reset ingredients count", () => {
    const result = ingredientsReducer({...initialState, items: testIngredientsDataWithItemCount}, resetIngredientsCountAction());

    expect(result).toEqual({
      ...initialState,
      items: [
        {
          _id: "60666c42cc7b410027a1a9b1",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          __v: 0
        },
        {
          _id: "60666c42cc7b410027a1a9b5",
          name: "Говяжий метеорит (отбивная)",
          type: "main",
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: "https://code.s3.yandex.net/react/code/meat-04.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
          __v: 0
        }
      ]
    });
  });

  it("should handle switch tab", () => {
    const tab: string = 'two';
    const result = ingredientsReducer(initialState, setCurrentTabAction(tab));

    expect(result).toEqual({
      ...initialState,
      currentTab: tab
    });
  });
})
