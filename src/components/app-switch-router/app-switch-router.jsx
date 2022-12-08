import React from 'react';
import { useLocation, Switch, Route } from "react-router-dom";
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { ModalIngredient } from '../app-modal/app-modal-ingredient';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { NotFound404, Registration, SignIn, ForgotPassword, ResetPassword } from '../../pages';
import { UserProfile } from '../user-profile/user-profile';
import { ProtectedRoute } from '../protected-route';
import { useSelector } from 'react-redux';

export function AppSwitchRouter() {
  const {isLoading, hasError} = useSelector(store => store.ingredients);
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
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
        <Route path="/ingredients/:id" exact={true}>
          <ModalIngredient />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && 
      (<Route path="/ingredients/:id">
        <ModalIngredient />
      </Route>)}
    </>
  )
}
