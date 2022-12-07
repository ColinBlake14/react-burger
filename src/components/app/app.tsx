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
import { UserProfile } from '../user-profile/user-profile';
import { ProtectedRoute } from '../protected-route';

function App() {
  const {isLoading, hasError} = useSelector((store: IRootState) => store.ingredients);

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.container}>
        
          <Switch>
            <ProtectedRoute onlyUnAuth={true} path="/login" exact={true}>
              <SignIn/>
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth={true} path="/register" exact={true}>
              <Registration/>
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact={true}>
              <ForgotPassword/>
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact={true}>
              <ResetPassword/>
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <UserProfile/>
            </ProtectedRoute>
            <Route path="/" >
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
            <Route>
              <NotFound404 />
            </Route>
          </Switch>
        
      </main>
    </div>
  );
}

export default App;
