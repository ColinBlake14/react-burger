import React, { useEffect, useState, useReducer } from 'react';
import styles from './app.module.css';
import { getIngredients } from '../../utils/api';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { IngredientsContext, ConstructorContext } from '../../utils/app-context';

const constructorInitialState = {
  bun: null,
  ingredients: []
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "set bun":
      return {
        ...state,
        bun: action.payload
      };
    case "set ingredient":
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case "delete bun":
      return {
        ...state,
        bun: null
      };
    case "delete ingredient":
      if (state.ingredients.length === 1) {
        return {
          ...state,
          ingredients: []
        };
      } else {
        const oldIngredients = [...state.ingredients];
        return {
          ...state,
          ingredients: [...oldIngredients.filter(item => item.uuid !== action.payload)]
        };
      }
    case "reset":
      return constructorInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
} 

function App() {
  const [ingredientsData, setIngredientsData] = useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  });

  const [constructorData, constructorDataDispatcher] = useReducer(
    reducer, constructorInitialState, undefined);

  useEffect(() => {  
    const getData = () => {
      setIngredientsData({ ...ingredientsData, hasError: false, isLoading: true });
  
      try {
        getIngredients().then(res => {
          if (res) {
            setIngredientsData({ ingredients: res, hasError: false, isLoading: false });
          }
        })
      } catch (err) {
        setIngredientsData({ ...ingredientsData, hasError: true, isLoading: false });
      }
    }

    getData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.container}>
        {ingredientsData.isLoading && (
          <p className="text text_type_main-medium">Загрузка...</p>
        )}
        {ingredientsData.hasError && (
          <p className="text text_type_main-medium">
            Не удалось загрузить данные
          </p>
        )}
        {!ingredientsData.isLoading && !ingredientsData.hasError && ingredientsData.ingredients.length && (
          <IngredientsContext.Provider value={{ingredientsData, setIngredientsData}}>
            <ConstructorContext.Provider value={{constructorData, constructorDataDispatcher}}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </ConstructorContext.Provider>    
          </IngredientsContext.Provider>
        )}
      </main>
    </div>
  );
}

export default App;
