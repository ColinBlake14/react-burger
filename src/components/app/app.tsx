import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { getIngredients } from '../../utils/api';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  });

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });

    try {
      getIngredients().then(res => {
        if (res) {
          setState({ ingredients: res, hasError: false, isLoading: false });
        }
      })
    } catch (err) {
      setState({ ...state, hasError: true, isLoading: false });
    }
  }

  useEffect(() => {  
    getData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.container}>
        {state.isLoading && (
          <p className="text text_type_main-medium">Загрузка...</p>
        )}
        {state.hasError && (
          <p className="text text_type_main-medium">
            Не удалось загрузить данные
          </p>
        )}
        {!state.isLoading && !state.hasError && state.ingredients.length && (
          <>
            <BurgerIngredients ingredientsData={state.ingredients}/>
            <BurgerConstructor ingredientsData={state.ingredients}/>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
