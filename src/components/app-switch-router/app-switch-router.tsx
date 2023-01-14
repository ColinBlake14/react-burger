import React from 'react';
import { useLocation, Switch, Route } from "react-router-dom";
import { ModalIngredient } from '../app-modal/app-modal-ingredient';
import { NotFound404, Registration, SignIn, ForgotPassword, ResetPassword } from '../../pages';
import { UserProfile } from '../user-profile/user-profile';
import { ProtectedRoute } from '../protected-route';
import { AppHomePage } from '../app-home-page/app-home-page';
import * as H from 'history';
import { OrdersFeed } from '../orders-feed/orders-feed';
import { ModalOrderInfo } from '../app-modal/app-modal-order-info';

export function AppSwitchRouter() {
  const location = useLocation<{ background: H.Location, backgroundOrder: H.Location, backgroundProfileOrder: H.Location }>();
  const background = location.state && location.state.background;
  const backgroundOrder = location.state && location.state.backgroundOrder;
  const backgroundProfileOrder = location.state && location.state.backgroundProfileOrder;

  return (
    <>
      <Switch location={background || backgroundOrder || backgroundProfileOrder || location}>
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
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <ModalOrderInfo />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <UserProfile/>
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <AppHomePage/>
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <ModalIngredient />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <ModalOrderInfo />
        </Route>
        <Route path="/feed" exact={true}>
          <OrdersFeed />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && 
      (<Route path="/ingredients/:id">
        <ModalIngredient />
      </Route>)}

      {backgroundOrder && 
      (<Route path="/feed/:id">
        <ModalOrderInfo />
      </Route>)}

      {backgroundProfileOrder && 
      (<Route path="/profile/orders/:id">
        <ModalOrderInfo />
      </Route>)}
    </>
  )
}
