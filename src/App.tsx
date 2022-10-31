import React from 'react';
import './App.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients'
import data from './data.json'

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main className='container'>
        <BurgerIngredients ingredientsData={data}/>
        <BurgerConstructor ingredientsData={data}/>
      </main>
    </div>
  );
}

export default App;
