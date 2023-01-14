import { Redirect, Route, useLocation } from 'react-router-dom';
import * as H from 'history';
import { useAppSelector } from '../utils/hooks';

type TProtectedRoute = {
  children: React.ReactNode,
  onlyUnAuth?: boolean,
  path?: string,
  exact?: boolean
}

export const ProtectedRoute = ({ children, onlyUnAuth = false, ...rest }: TProtectedRoute) => {
  const location = useLocation<{ from: H.Location }>();
  let { from } = location.state || { from: { pathname: "/" } };

  const isAuthChecked = useAppSelector(store => store.registerLoginUser.authChecked);
  const isUserLoaded = useAppSelector(store => store.registerLoginUser.loginSuccess);

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && isUserLoaded) {
    return (
      <Redirect
        to={{
          pathname: from.pathname,
          state: { from: location }
        }}
      />
    )
  }

  if (!onlyUnAuth && !isUserLoaded) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    )
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
          children
      }
    />
  );
}
