import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TRootState } from '../services/reducers';
import * as H from 'history';

type TProtectedRoute = {
  children: React.ReactNode,
  onlyUnAuth?: boolean,
  path?: string,
  exact?: boolean
}

export const ProtectedRoute = ({ children, onlyUnAuth = false, ...rest }: TProtectedRoute) => {
  const location = useLocation<{ from: H.Location }>();
  let { from } = location.state || { from: { pathname: "/" } };

  const isAuthChecked = useSelector((store: TRootState) => store.registerLoginUser.authChecked);
  const isUserLoaded = useSelector((store: TRootState) => store.registerLoginUser.loginSuccess);

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
