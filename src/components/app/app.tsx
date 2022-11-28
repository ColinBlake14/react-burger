import React from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { useSelector } from 'react-redux';
import { IRootState } from '../..';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route } from 'react-router-dom';
import { NotFound404, Registration, SignIn, ForgotPassword, ResetPassword } from '../../pages';

function App() {
  const {isLoading, hasError} = useSelector((store: IRootState) => store.ingredients);

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.container}>
        
          <Switch>
            <Route path="/" exact={true}>
              {isLoading && (
                <p className="text text_type_main-medium">Загрузка...</p>
              )}
              {hasError && (
                <p className="text text_type_main-medium">
                  Не удалось загрузить данные
                </p>
              )}
              {!isLoading && !hasError && (
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients/>
                  <BurgerConstructor/>
                </DndProvider>
              )}
            </Route>
            <Route path="/login" exact={true}>
              <SignIn/>
            </Route>
            <Route path="/register" exact={true}>
              <Registration/>
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPassword/>
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPassword/>
            </Route>
            <Route>
              <NotFound404 />
            </Route>
          </Switch>
        
      </main>
    </div>
  );
}

export default App;
