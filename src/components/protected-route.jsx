import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, onlyUnAuth = false, ...rest }) {
  const isUserLoaded = useSelector(store => store.registerLoginUser.loginSuccess);
  const location = useLocation();

  if (onlyUnAuth && isUserLoaded) {
    return (
      <Redirect
        to={{
          pathname: '/',
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
