import React from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import data from '../../utils/data.json'

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.container}>
        <BurgerIngredients ingredientsData={data}/>
        <BurgerConstructor ingredientsData={data}/>
      </main>
    </div>
  );
}

export default App;
